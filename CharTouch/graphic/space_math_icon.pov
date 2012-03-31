global_settings { assumed_gamma 2.2 }
global_settings { charset utf8 }

#include "colors.inc"        
#include "textures.inc"

camera {
   location  <0, 0,-10>
   direction <0, 0,  1>
   up        <0,  1,  0>
   right     <4/3, 0,  0>
   look_at   <0, 0, 0>
   }

background { color rgb <0, 0, 0> }


light_source {<0, 10, -100> colour White}

cylinder { <-3.7, 4, 0>, <3.7, 4, 0>, 0.15 texture {Gold_Metal} }
cylinder { <-3.7, -1.0, 0>, <3.7, -1.0, 0>, 0.15 texture {Gold_Metal} }
cylinder { <4.5, 3.2, 0>, <4.5, -0.2, 0>, 0.15 texture {Gold_Metal} }
cylinder { <-4.5, 3.2, 0>, <-4.5, -0.2, 0>, 0.15 texture {Gold_Metal} }   
object {
        intersection {
                torus { 0.8, 0.15 }
                box {<0, -10, 0>, <-10, 10, -10>}
        }
        texture {Gold_Metal}
        rotate <90,0,0>
        translate<-3.7, 3.2, 0>
}
object {
        intersection {
                torus { 0.8, 0.15 }
                box {<0, -10, 0>, <10, 10, -10>}
        }
        texture {Gold_Metal}
        rotate <90,0,0>
        translate<3.7, 3.2, 0>
}
object {
        intersection {
                torus { 0.8, 0.15 }
                box {<0, -10, 0>, <-10, 10, 10>}
        }
        texture {Gold_Metal}
        rotate <90,0,0>
        translate<-3.7, -0.2, 0>
}
object {
        intersection {
                torus { 0.8, 0.15 }
                box {<0, -10, 0>, <10, 10, 10>}
        }
        texture {Gold_Metal}
        rotate <90,0,0>
        translate<3.7, -0.2, 0>
}

text { ttf "BOD_BLAR.TTF", "SPACE", 2, 0
   translate <-1.71, 0.9, 0>   
   texture {Gold_Metal}
   scale <2.2, 2.2, 1>
   }

text { ttf "BOD_BLAR.TTF", "MATH", 2, 0
   translate <-1.65, -0.1, 0>   
   texture {Gold_Metal}
   scale <2.2, 2.2, 1>
   }
 