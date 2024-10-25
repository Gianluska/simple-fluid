export const colorShader = `
  precision mediump float;

  uniform vec4 color;

  void main () {
      gl_FragColor = color;
  }
`