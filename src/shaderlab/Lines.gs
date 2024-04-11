Shader "Lines" {
  SubShader "Default" {
     Pass "0" {
      mat4 renderer_MVPMat;
      vec3 u_color;
      
      struct a2v {
        vec4 POSITION;
      }
      
      struct v2f {
        vec4 v_pos;
        vec3 v_color;
      }
      
      VertexShader = vert;
      FragmentShader = frag;
      
      v2f vert(a2v v) {
        v2f o;
        gl_Position = renderer_MVPMat * v.POSITION;
        o.v_color = u_color;
        o.v_pos = v.POSITION;
        return o;
      } 
      
      #define S smoothstep
      vec4 scene_ElapsedTime;
      vec4 Line(vec2 uv, float speed, float height, vec3 col) {
         uv.y += S(1.0, 0.0, abs(uv.x)) * sin(scene_ElapsedTime.x * speed + uv.x * height) * 0.2;
         return vec4(S(0.06 * S(0.2, 0.9, abs(uv.x)), 0.0, abs(uv.y) - 0.004) * col, 1.0) * S(1.0, 0.3, abs(uv.x));
      } 
      void frag(v2f i) {
        vec2 iResolution = vec2(1.0, 1.0);
        vec2 uv = i.v_pos.xy / iResolution.y;
        vec4 color = vec4(0.0);
        for (float i = 0.0; i <= 7.0; i += 1.0) {
          float t = i / 5.0;
          color += Line(uv, 1.0 + t, 4.0 + t, vec3(0.2 + t * 0.7, 0.2 + t * 0.4, 0.3));
        }
        gl_FragColor = color;
      }
    }
  }
}