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
   location  <15, -1, 1>
   direction <0, 0,  1>
   up        <0,  1,  0>
   right     <4/3, 0,  0>
   look_at   <0, 0, 0>
   }
   

background { color rgb <0, 0, 0> }
light_source {<1000, 3, -1000> colour White}
light_source {<200, 3, -1000> colour White}
light_source {<500, 1000, 500> colour White}
light_source {<500, -1000, 500> colour White}

// triangular FINITE (no CSG) shape (vertices are endpoints)
object {
        //m_ufo
        // create a Surface of Revolution shape (like lathe, but faster)
sor {
    10, // # of points
    <0.0, 0.0>,
    <4.0, 0.0>,
    <3.5, 0.5>,
    <3.0, 0.7>,
    <2.5, 0.9>,
    <2.0, 1.0>,
    <1.5, 1.5>,
    <1.0, 1.7>,
    <0.5, 1.9>,
    <0.0, 2.0>
    // [open]
}    
        texture {Chrome_Metal}        
}                     
object { 
        union {
                sphere { <2, 0.2, 0>, 0.75}
                sphere { <0, 0.2, 2>, 0.75 }
                sphere { <-2, 0.2, 0>, 0.75 }
                sphere { <0, 0.2, -2>, 0.75 }
        }        
        texture {Copper_Metal} 
        
}