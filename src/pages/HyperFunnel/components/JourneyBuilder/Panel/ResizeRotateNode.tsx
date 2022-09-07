import { useEffect, useState, useRef, useMemo } from 'react';
import Moveable from 'moveable';
import { Handle, useUpdateNodeInternals } from 'react-flow-renderer';

export default function ResizeRotateNode({ id, data, selected, dragging, sourcePosition, targetPosition }: any) {
  const nodeRef = useRef<any>();
  const [size, setSize] = useState({ width: data.width, height: 700 });
  const [transform, setTransform] = useState('none');
  const updateNodeInternals = useUpdateNodeInternals();

  const style = useMemo(
    () => ({
      transform,
      width: size.width,
      height: size.height,
      background: data?.backgroundColor,
      padding: 20,
      borderRadius: 10,
    }),
    [transform, size.width, size.height, data?.backgroundColor],
  );

  useEffect(() => {
    if (!nodeRef.current || !selected || dragging) {
      return;
    }

    const moveable = new Moveable(document.body, {
      target: nodeRef.current,
      className: 'nodrag',
      draggable: false,
      resizable: true,
      scalable: false,
      rotatable: false,
      warpable: false,
      pinchable: false,
      origin: false,
      keepRatio: false,
      edge: false,
      throttleDrag: 0,
      throttleResize: 0,
      throttleScale: 0,
      throttleRotate: 0,
      dragArea: false,
    });

    moveable.on('resize', ({ width, height, drag }) => {
      setTransform(drag.transform);
      setSize({ width, height });
    });

    return () => moveable.destroy();
  }, [selected, dragging]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [transform, id, updateNodeInternals]);

  return (
    <div ref={nodeRef} style={style}>
      <span>{data.label}</span>
      <Handle style={{ opacity: 0 }} position={sourcePosition} type="source" />
      <Handle style={{ opacity: 0 }} position={targetPosition} type="target" />
    </div>
  );
}
