global_settings { assumed_gamma 2.2 }

#include "colors.inc"        
#include "textures.inc"

camera {
   location  <0, 20, 0>
   direction <0, 0,  -1>
   up        <0,  1,  0>
   right     <4/3, 0,  0>
   look_at   <0, 0, 0>
   }

background { color rgb <0, 0, 0> }
light_source {<50, 100, 50> colour White}
light_source {<-500, 1000, 500> colour White}

object {
        torus { 1.5, 0.5 }
        texture {Gold_Metal}
}

object {
        cylinder {<2.5, 0, 0>, <1.5, 0, 0>, 0.5}
        texture {Gold_Metal}
}

object {
        cylinder {<2.5, 0, 0>, <1.5, 0, 0>, 0.5}
        texture {Gold_Metal}
        rotate < 0, 60, 0>
}
object {
        cylinder {<2.5, 0, 0>, <1.5, 0, 0>, 0.5}
        texture {Gold_Metal}
        rotate < 0, 120, 0>
}
object {
        cylinder {<2.5, 0, 0>, <1.5, 0, 0>, 0.5}
        texture {Gold_Metal}
        rotate < 0, 180, 0>
}
object {
        cylinder {<2.5, 0, 0>, <1.5, 0, 0>, 0.5}
        texture {Gold_Metal}
        rotate < 0, -60, 0>
}
object {
        cylinder {<2.5, 0, 0>, <1.5, 0, 0>, 0.5}
        texture {Gold_Metal}
        rotate < 0, -120, 0>
}
 