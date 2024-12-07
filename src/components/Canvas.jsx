/**
 *  Code was copied from Lucas Miranda's Medium Article.
 *  https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
 */

import React, { useRef, useEffect } from "react";

const Canvas = (props) => {
  const { draw, doRender, ...rest } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

    console.log(doRender);
    const render = () => {
      if (doRender) {
        console.log("Help");
        draw(context);
      }
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
