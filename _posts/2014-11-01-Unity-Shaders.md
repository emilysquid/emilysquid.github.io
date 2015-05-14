---
layout: post
title: "Shaders in Unity"
photo_url: "http://emilysaliba.com/public/pictures/9-LeavingEngineRoom.png"
---


<div class="message">
  I recently started learning about ShaderLab in Unity when I found out that Strumpy is no longer supported in Unity.
</div>

There weren't any obvious resources around, so I mainly learned from what's around the web. After about 6 tries, I made a toon shader with outline, emissive, a shadow ramp, diffuse, and specular inputs.  I gave this shader to Squidware for their game, <a href="http://game.colum.edu/projects/spacerace/">The Metacosmic Earthrace</a>.  

![placeholder](http://emilysaliba.com/public/pictures/9-LeavingEngineRoom.png "Small example image")


### Code

I ended up having to write some custom lighting to make it exactly the way the team wanted.

{% highlight js %}
    half4 CustomLighting (SurfaceOutput s, half3 lightDir, half3 viewDir, half atten)
        {
          
            half3 h = normalize (lightDir + viewDir);
            float nh = max (0, dot (s.Normal, h));
            
            float spec = pow (nh, 48.0);
            half diff = max (0, dot (s.Normal, lightDir));
            half specdiff = max(0, dot(s.Normal, spec));
            //diff = tex2D(_Intensity, float2(diff, 0.5));
            specdiff = tex2D(_SpecMap, float2(specdiff, 0.5));

      half4 c;
            c.rgb = (s.Albedo * _LightColor0.rgb * diff + _LightColor0.rgb * (specdiff * _Shininess)) * (atten * 2);
            c.a = s.Alpha;
            return c;
       }
{% endhighlight %}

This is some of the earlier UI. The frog is just what I used to test my shader on.  
![placeholder](http://emilysaliba.com/public/pictures/UI.png "Small example image")


Making the feilds is actually really simple in Unity.  Here's what they look like in ShaderLab:

{% highlight js %}
  Properties {
    _MainTex ("Base (RGB) Trans (A)", 2D) = "white" {}
    _Color ("Main Color", Color) = (1,1,1,1)
    
    _DiffuseColor ("Diffuse Color", Color) = (1,1,1,1)
    //_Bump ("Bump", 2D) = "bump" {}
    
    _SpecMap ("Specular Map", 2D) = "grey" {}
    _Shininess ("Shininess", Range (0.01, 1)) = 0.078125
    
    _Emissive("Emissive Map", 2D) = "black" {}
    _Intensity("Intensity", Range(0,10) ) = 0.5
    
    _Outline("Outline", Range(0, 1)) = 0.1
    
    
  }
{% endhighlight %}
