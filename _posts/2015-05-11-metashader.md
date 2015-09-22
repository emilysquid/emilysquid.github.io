---
layout: portfolio_entry
title: Metacosmic Earthrace
image: /img/9-LeavingEngineRoom.png
---
I was the technical artist for &lt;a target='_blank' href=http://game.colum.edu/projects/spacerace/&gt;The Metacosmic Earthrace&lt;/a&gt;.  Usually, this team relied on Strumpy for their shaders, but the newest version of Unity no longer supported it.  Without a license to any kind of software to create shaders, I learned how to code shaders in Unity's shaderlab language. There weren't any obvious resources around, so I had to search around for little snips of information. After about 6 tries, I made a toon shader with outline, emissive, a shadow ramp, diffuse, and specular inputs.  I gave this shader to Squidware for the game. 

I ended up having to write some custom lighting to make it exactly the way the team wanted.
&lt;pre&gt;
&lt;code&gt;
    half4 CustomLighting (SurfaceOutput s, half3 lightDir, half3 viewDir, half atten)
        {        
            half3 h = normalize (lightDir + viewDir);
            float nh = max (0, dot (s.Normal, h));
            float spec = pow (nh, 48.0);
            half diff = max (0, dot (s.Normal, lightDir));
            half specdiff = max(0, dot(s.Normal, spec));
            specdiff = tex2D(_SpecMap, float2(specdiff, 0.5));
      		half4 c;
            c.rgb = (s.Albedo * _LightColor0.rgb * diff + _LightColor0.rgb * (specdiff * _Shininess)) * (atten * 2);
            c.a = s.Alpha;
            return c;
       }
&lt;/code&gt;
&lt;/pre&gt;