global_settings { assumed_gamma 2.2 }
global_settings { charset utf8 }

#include "colors.inc"        
#include "textures.inc"

camera {
   location  <0, 0,-20>
   direction <0, 0,  1>
   up        <0,  1,  0>
   right     <4/3, 0,  0>
   look_at   <0, 0, 0>
   }

background { color rgb <0, 0, 0> }


light_source {<0, 10, -100> colour White}

cylinder { <-3.7, 4, 0>, <3.7, 4, 0>, 0.15 texture {Silver_Metal} }
cylinder { <-3.7, -1.0, 0>, <3.7, -1.0, 0>, 0.15 texture {Silver_Metal} }
cylinder { <4.5, 3.2, 0>, <4.5, -0.2, 0>, 0.15 texture {Silver_Metal} }
cylinder { <-4.5, 3.2, 0>, <-4.5, -0.2, 0>, 0.15 texture {Silver_Metal} }   
object {
        intersection {
                torus { 0.8, 0.15 }
                box {<0, -10, 0>, <-10, 10, -10>}
        }
        texture {Silver_Metal}
        rotate <90,0,0>
        translate<-3.7, 3.2, 0>
}
object {
        intersection {
                torus { 0.8, 0.15 }
                box {<0, -10, 0>, <10, 10, -10>}
        }
        texture {Silver_Metal}
        rotate <90,0,0>
        translate<3.7, 3.2, 0>
}
object {
        intersection {
                torus { 0.8, 0.15 }
                box {<0, -10, 0>, <-10, 10, 10>}
        }
        texture {Silver_Metal}
        rotate <90,0,0>
        translate<-3.7, -0.2, 0>
}
object {
        intersection {
                torus { 0.8, 0.15 }
                box {<0, -10, 0>, <10, 10, 10>}
        }
        texture {Silver_Metal}
        rotate <90,0,0>
        translate<3.7, -0.2, 0>
}

box {
  <4.5, 4, 0>  // one corner position <X1 Y1 Z1>
  <-4.5,  -1,  0.01>  // other corner position <X2 Y2 Z2>
  texture {Silver_Metal}
}
