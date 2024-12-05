/**
 *  Code was copied from Lucas Miranda's Medium Article.
 *  https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
 */

import React, { useRef, useEffect, useState } from "react";

const Canvas = (props) => {
  const { draw, doRender, ...rest } = props;
  const canvasRef = useRef(null);
  const [updateRender, setUpdateRender] = useState(doRender);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

    const render = () => {
      draw(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    // Flickering Prevention: Don't update canvas every single tick.
    if (initialRender) {
      setTimeout(render, 100);
      setInitialRender(false);
    }
    if (updateRender) {
      setUpdateRender(false);
      render();
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
