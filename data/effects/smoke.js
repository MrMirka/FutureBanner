function smoke(params){
    function hexColorToVec3(hexString) {
        //check if valid hex value
    if (/^#([0-9A-F]{3}){1,2}$/i.test(hexString)) {
            // Extracted from: https://github.com/mrdoob/three.js/blob/dev/src/math/Color.js#L229

            const match = /^\#([A-Fa-f0-9]+)$/.exec(hexString);

            const hex = match[1];
            const size = hex.length;

            if ( size === 3 ) {

                // #ff0
                const output = [
                    parseInt( hex.charAt( 0 ) + hex.charAt( 0 ), 16 ) / 255,
                    parseInt( hex.charAt( 1 ) + hex.charAt( 1 ), 16 ) / 255,
                    parseInt( hex.charAt( 2 ) + hex.charAt( 2 ), 16 ) / 255,
                ];

                return output;

            } else if ( size === 6 ) {

                // #ff0000
                const output = [
                    parseInt( hex.charAt( 0 ) + hex.charAt( 1 ), 16 ) / 255,
                    parseInt( hex.charAt( 2 ) + hex.charAt( 3 ), 16 ) / 255,
                    parseInt( hex.charAt( 4 ) + hex.charAt( 5 ), 16 ) / 255,
                ];

                return output;

            }

        } else {
            throw new Error('The passed hex color is not valid.');
        }
    };

    var uniforms = {
        dimensions: [params.canvasSize.width, params.canvasSize.height],
        time: 0,

        // TODO: Decide wether remove 'speed' uniform or not.
        // This multiplies the frequency in the fbm functions.
        speed: [0.4, 0.7], // speed in each component.

        // Smoke colors
        smoke1_color_a: hexColorToVec3('#B55DB4'),
        smoke1_color_b: hexColorToVec3('#0F2C30'),

        smoke2_color_a: hexColorToVec3('#0F2C30'),
        smoke2_color_b: hexColorToVec3('#0F2C30'),

        // Used to increase the brightness of the image on transitions.
        brightness: 0.5,
    }
    return {f: frag, u: uniforms};
}

const frag = `
// Original fragment shader extracted from:
// https://gist.github.com/OmarShehata/9650b8ee419db3696ce555f10712d499
precision mediump float;
// Cant be named 'resolution' since it's a default uniform
// provided by PIXI.Filter(), see: https://pixijs.download/dev/docs/PIXI.Filter.html
// And the PIXI's resolution unifmor is the ratio of screen (CSS) pixels to real pixels.
uniform vec2  dimensions;
uniform float time;
uniform vec2  speed;

// Smoke colors
uniform vec3  smoke1_color_a;
uniform vec3  smoke1_color_b;

uniform vec3  smoke2_color_a;
uniform vec3  smoke2_color_b;

// Used to increase the brightness of the image on transitions.
uniform float brightness; // 0.5 by default.

float rand(vec2 n) {
    // This is just a compounded expression to simulate a random number based on a seed given as n.
    // fract() returns the fractional part of x. This is calculated as x - floor(x).
    // This is like a (x % 1) operation.
    // see more in: https://thebookofshaders.com/10/
    return fract(cos(dot(n, vec2(3, 10))) * 15.5453);
}

float noise(vec2 n) {
    const vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}


float fbm(vec2 n) {
    // fbm stands for 'Fractal Brownian Motion',
    // see more in: https://thebookofshaders.com/13/
    // https://en.wikipedia.org/wiki/Fractional_Brownian_motion
    float gain = 0.5;
    // we successively increment the frequencies in regular steps (lacunarity).
    float lacunarity = 2.15; // this is a magic number to generate a little bit of distortion.

    float total = 0.0, amplitude = 0.75;
    for (int i = 0; i < 10; i++) {
        total += noise(n) * amplitude;
        // n += n; // lacunarity, increments 1 octave in each cycle.
        // lacunarity increments frequency exponentially each cycle in a factor
        // to genereta a litle of distortion.
        n *= lacunarity;
        // Decreases the amplitud by half each iteration.
        amplitude *= gain;
    }
    return total;
}

void main() {
    const vec3 c1 = vec3(0.0,0.0,0.150);
    const vec3 c2 = vec3(167. / 255., 93. / 255., 110. / 255.);
    const vec3 c3 = vec3(0.4902, 0.5333, 0.4902);
    const vec3 c4 = vec3(0.370,0.254,0.240);
    const vec3 c5 = vec3(0.157,0.317,0.320);
    const vec3 c6 = vec3(0.8, 0.3569, 0.3569);

    // vec2 p = gl_FragCoord.xy * 3.0 / dimensions.xx;
    vec2 p = gl_FragCoord.xy * 2.3 / dimensions.xx;

    float q = fbm(p - time * 0.1);

    vec2 r = vec2(fbm(p + q + time * speed.x - p.x - p.y), fbm(p + q - time * speed.y));

    vec3 c = mix(c1, c2, fbm(p + r)) + mix(c3, c4, r.x) - mix(c5, c6, r.y);

    // Just a cyclic number to multiply with the c color.
    // the name of this variable has nothing to do with the alpha-premultiply algorithm.
    // I'm no longer passing the shift as an uniform since I need magic numbers.
    //float premultiplier = 1.0 - sin(shift * gl_FragCoord.y / dimensions.y);
    float premultiplier = 1.0 - sin(0.5 * gl_FragCoord.y / dimensions.y);
    vec3 endColor = c * premultiplier;

gl_FragColor = vec4(endColor * brightness, 1.5);
    // Uncomment the next line to debug colors and smoke effect without brightness parameters.
gl_FragColor = vec4(endColor * 0.5, 0.5);

    // To produce the volumetric fog effect.
    // https://developer.nvidia.com/gpugems/gpugems3/part-ii-light-and-shadows/chapter-13-volumetric-light-scattering-post-process
    vec2 st = gl_FragCoord.xy/dimensions.xy;
    vec2 pos = vec2(0.15,0.1);

    // when brightness <= 0.3, smoothstep returns: 0.0
    // when brightness in (0.3, 2.0) range, smoothstep returns: hermite interpolation between 0 and 1.
    // when brightness >= 2.0, smoothstep returns: 1.0
    // The brightnessSlider is used to make all the mask clear during transitions (hide the center circle from the mask).
    float brightnessSlider = smoothstep( 0.9, 0.0, brightness );
    float aperture = mix(0.9, -0.5, brightnessSlider);
    float centerMask = smoothstep( aperture, .56, distance(st, vec2(-0.1, 0.)) ) * r.x;
    // Uncomment next line and comment the last one to debug only mask.
    gl_FragColor = vec4(c * cos(0.5 * gl_FragCoord.y /dimensions.y), 1.0);
    gl_FragColor.xyz *= centerMask;
}
`;
export {smoke};