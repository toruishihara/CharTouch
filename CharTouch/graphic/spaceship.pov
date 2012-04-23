// Persistence of Vision Ray Tracer Scene Description File
// File: .pov
// Vers: 3.6
// Desc:
// Date:
// Auth:

// ==== Standard POV-Ray Includes ====
#include "colors.inc"	  // Standard Color definitions
#include "textures.inc"	  // Standard Texture definitions
#include "functions.inc"  // internal functions usable in user defined functions    
//#include "ufo.inc"

camera {
   location  <0, 5, 21>
   direction <0, 0,  -1>
   up        <0,  1,  0>
   right     <4/3, 0,  0>
   look_at   <0, 5, 0>
   }
   

background { color rgb <0, 0, 0> }
light_source {<10, 10, 1000> colour White}
light_source {<-10, 10, 1000> colour White}

object {
        union {
                sphere {
                        <0, 10, 0> // center of sphere <X Y Z>
                        1       // radius of sphere
                }
                cylinder { <0, 0, 0>, <0, 10, 0>, 1 } 
                triangle {
                        < 1, 1, 0>,  // <Vertex1>
                        < 3, 1, 0>,  // <Vertex2>
                        < 1, 4, 0>   // <Vertex3>
                }     
                triangle {
                        < 3, 4, 0>,  // <Vertex1>
                        < 3, 1, 0>,  // <Vertex2>
                        < 1, 4, 0>   // <Vertex3>
                }     
                triangle {
                        < -1, 1, 0>,  // <Vertex1>
                        < -3, 1, 0>,  // <Vertex2>
                        < -1, 4, 0>   // <Vertex3>
                }     
                triangle {
                        < -3, 4, 0>,  // <Vertex1>
                        < -3, 1, 0>,  // <Vertex2>
                        < -1, 4, 0>   // <Vertex3>
                }
                sphere {
                        <3, 4.5, 00> // center of sphere <X Y Z>
                        0.3       // radius of sphere
                }
                sphere {
                        <-3, 4.5, 00> // center of sphere <X Y Z>
                        0.3       // radius of sphere
                }
                cylinder { <3, 0.5, 0>, <3, 4.5, 0>, 0.3 } 
                cylinder { <-3, 0.5, 0>, <-3, 4.5, 0>, 0.3 } 
        }
        texture {Silver_Metal}        
}                     
object {
// create a sphere shape 
        union {
                sphere {
                        <0, 8, 0.7> // center of sphere <X Y Z>
                        0.5       // radius of sphere
                }
                cylinder { <0, 8, 0.7>, <0, 6, 0.7>, 0.5 } 
                sphere {
                        <0, 6, 0.7> // center of sphere <X Y Z>
                        0.5       // radius of sphere
                }
        }
        texture {Shadow_Clouds}      
}
