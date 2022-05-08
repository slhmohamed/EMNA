import { Component, OnInit } from "@angular/core";
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

@Component({
  selector: "app-map",
  templateUrl: "map.component.html",
  styleUrls: ['./map.component.scss']

 })
export class MapComponent implements OnInit {
  constructor(private userService:UserService,
    private toastr:ToastrService) {}
  public lat;
  public lng;
  banque:any=[];
  markers=[]
  ngOnInit() {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
     
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        var myLatlng = new google.maps.LatLng(  this.lat,this.lng);

        var marker = new google.maps.Marker({
          position: myLatlng,
          visible: true,
          opacity: 0.6,
          label: {
             color: '#333',
             text: 'My Label',
          },
          title: "Votre localisation!"
          
      });

        var mapOptions = {
            zoom: 7,
            center: myLatlng,
            scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: [{
                "elementType": "geometry",
                "stylers": [{
                  "color": "#1d2c4d"
                }]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#8ec3b9"
                }]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [{
                  "color": "#1a3646"
                }]
              },
              {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [{
                  "color": "#4b6878"
                }]
              },
              {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#64779e"
                }]
              },
              {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [{
                  "color": "#4b6878"
                }]
              },
              {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [{
                  "color": "#334e87"
                }]
              },
              {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#023e58"
                }]
              },
              {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#283d6a"
                }]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#6f9ba5"
                }]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [{
                  "color": "#1d2c4d"
                }]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                  "color": "#023e58"
                }]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#3C7680"
                }]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#304a7d"
                }]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#98a5be"
                }]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                  "color": "#1d2c4d"
                }]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#2c6675"
                }]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                  "color": "#9d2a80"
                }]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                  "color": "#9d2a80"
                }]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#b0d5ce"
                }]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [{
                  "color": "#023e58"
                }]
              },
              {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#98a5be"
                }]
              },
              {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [{
                  "color": "#1d2c4d"
                }]
              },
              {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [{
                  "color": "#283d6a"
                }]
              },
              {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#3a4762"
                }]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#0e1626"
                }]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#4e6d70"
                }]
              }
            ]
        };
        var marker = new google.maps.Marker({
          position: myLatlng,
           
          title: "Mon position !",
          options :{
            draggable: false, 
            height:'10px',
icon:'https://img.icons8.com/dusk/64/000000/user-location.png'         }
          
      });
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        marker.setMap(map);
        this.userService.getBanques().subscribe(res=>{
this.banque=res
this.banque.forEach(element => {
  
console.log(element);

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng( element.latitude,element.longitude),
    label: {
      color: 'black',
       
    },
    title: ""+element.nom
    
});
  this.markers.push(marker);

marker.setMap(map);
});
       
     

 
        // To add the marker to the map, call setMap();
      
      })
       }
       
    })
    
   } else {
    alert("Geolocation is not supported by this browser.");
  }
  }
  float2int (value) {
    return value | 0;
}
  rendezVous(){
     
    this.markers.forEach(element => {
      element.setMap(null) 
     });
     
this.lng=this.float2int(this.lng)
this.lat=this.float2int(this.lat)
 
this.banque.forEach(element => {
  var la=this.float2int(element.latitude);
  var lo=this.float2int(element.longitude);
   
 if((this.lng==lo)||(this.lat=la)){

 var marker = new google.maps.Marker({
  position: new google.maps.LatLng(  la,lo),
   
  title: "Position Correct !",
  options :{
    draggable: false, 
    height:'10px',
icon:'https://img.icons8.com/color-glass/48/000000/order-delivered.png'  
       }
  
});


 
var mapOptions = {
  zoom: 7,
  center: new google.maps.LatLng(  this.lat,this.lng),
  scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
  styles: [{
      "elementType": "geometry",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#8ec3b9"
      }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1a3646"
      }]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#4b6878"
      }]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#64779e"
      }]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#4b6878"
      }]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#334e87"
      }]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [{
        "color": "#023e58"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#283d6a"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#6f9ba5"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#023e58"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#3C7680"
      }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "color": "#304a7d"
      }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#98a5be"
      }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "color": "#2c6675"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#9d2a80"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#9d2a80"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#b0d5ce"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#023e58"
      }]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#98a5be"
      }]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#283d6a"
      }]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [{
        "color": "#3a4762"
      }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#0e1626"
      }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#4e6d70"
      }]
    }
  ]
};
var map = new google.maps.Map(document.getElementById("map"), mapOptions);

marker.setMap(map)
 


return;

 }
  
  
  

  
});
this.toastr.success('Votre rendez vous bien planifié', 'Notification');

}

  
}
