function simpleDark(params){
    var uniforms = {
        dimensions: [params.canvasSize.width, params.canvasSize.height],
        shift: 1,
    }
    return {f: frag, u: uniforms};
}

const frag = `
precision mediump float;

uniform vec2  dimensions;
uniform float shift;

void main() {
    gl_FragColor = vec4(0.0,0.0,0.0,shift);
}
`;
export {simpleDark};