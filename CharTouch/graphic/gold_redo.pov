global_settings { assumed_gamma 2.2 }

#include "colors.inc"        
#include "textures.inc"

camera {
   location  <1, 20, 1>
   direction <0, 0,  -1>
   up        <0,  1,  0>
   right     <4/3, 0,  0>
   look_at   <0, 0, 0>
   }

background { color rgb <0, 0, 0> }
light_source {<50, 100, 50> colour White}
light_source {<-500, 1000, 500> colour White}

object {
        difference {                                       
                torus { 1.5, 0.5 }
                box { <0, -10, 0>, <10, 10, 10> }
        }
        texture {Gold_Metal}
}
object {
        cone { <0, 0, 1.5>, 1, <1.5, 0, 1.5>, 0 }
        texture {Gold_Metal}
}

 