function maybeAutoPan(event: MouseEvent) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let deltaX = 0;
    let deltaY = 0;
    const SCREEN_MARGIN = 60;
    const PAN_SPEED = 10;
  
    if (event.clientX < SCREEN_MARGIN) deltaX = PAN_SPEED;
    else if (event.clientX > windowWidth - SCREEN_MARGIN) deltaX = -PAN_SPEED;
  
    if (event.clientY < SCREEN_MARGIN) deltaY = PAN_SPEED;
    else if (event.clientY > windowHeight - SCREEN_MARGIN) deltaY = -PAN_SPEED;
  
    if (deltaX !== 0 || deltaY !== 0) {
      // 🛠 Move the board
      setTransform((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      setPreTransform((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
  
      // 🛑 DO NOT touch clickedPosition!
      // 🛑 DO NOT touch lastPointer!
  
      if (groupBoundingBox()) {
        setGroupBoundingBox((prev) => ({
          x: prev.x - deltaX / scale(),
          y: prev.y - deltaY / scale(),
          width: prev.width,
          height: prev.height,
        }));
  
        selectedNodesGroup().forEach((nodeId) => {
          const node = nodes().find((n) => n.id === nodeId);
          if (node) {
            const prevPos = node.currPosition.get();
            node.currPosition.set({
              x: prevPos.x - deltaX / scale(),
              y: prevPos.y - deltaY / scale(),
            });
  
            node.inputEdgeIds.get().forEach((edgeId) => {
              const edge = edges().find((e) => e.id === edgeId);
              if (edge) {
                const prevEnd = edge.currEndPosition.get();
                edge.currEndPosition.set({
                  x: prevEnd.x - deltaX / scale(),
                  y: prevEnd.y - deltaY / scale(),
                });
              }
            });
  
            node.outputEdgeIds.get().forEach((edgeId) => {
              const edge = edges().find((e) => e.id === edgeId);
              if (edge) {
                const prevStart = edge.currStartPosition.get();
                edge.currStartPosition.set({
                  x: prevStart.x - deltaX / scale(),
                  y: prevStart.y - deltaY / scale(),
                });
              }
            });
          }
        });
      }
    }
  }


  function maybeAutoPan(event: MouseEvent) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let deltaX = 0;
    let deltaY = 0;
    const SCREEN_MARGIN = 60; // trigger zone near screen edge
    const PAN_SPEED = 10; // constant px per move
  
    if (event.clientX < SCREEN_MARGIN) deltaX = PAN_SPEED;
    else if (event.clientX > windowWidth - SCREEN_MARGIN) deltaX = -PAN_SPEED;
  
    if (event.clientY < SCREEN_MARGIN) deltaY = PAN_SPEED;
    else if (event.clientY > windowHeight - SCREEN_MARGIN) deltaY = -PAN_SPEED;
  
    if (deltaX !== 0 || deltaY !== 0) {
      // Move the board
      setTransform({
        x: transform().x + deltaX,
        y: transform().y + deltaY,
      });
      setPreTransform({
        x: transform().x + deltaX,
        y: transform().y + deltaY,
      });
  
      // 🔥 Correct clickedPosition shifting depending on mode
      if (groupBoundingBox()) {
        setClickedPosition((prev) => ({
          x: prev.x - deltaX,
          y: prev.y - deltaY,
        }));
      } else {
        setClickedPosition((prev) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));
      }
  
      // ✅ Also shift the lastPointer
      if (lastPointer()) {
        setLastPointer({
          x: lastPointer()!.x + deltaX,
          y: lastPointer()!.y + deltaY,
        });
      }
  
      // 🔥 Move the bounding box correctly
      if (groupBoundingBox()) {
        setGroupBoundingBox((prev) => ({
          x: prev.x - deltaX / scale(),
          y: prev.y - deltaY / scale(),
          width: prev.width,
          height: prev.height,
        }));
      }
  
      // ✅ Move nodes and their edges
      if (groupBoundingBox()) {
        selectedNodesGroup().forEach((nodeId) => {
          const node = nodes().find((n) => n.id === nodeId);
          if (node) {
            const prevPos = node.currPosition.get();
            node.currPosition.set({
              x: prevPos.x - deltaX / scale(),
              y: prevPos.y - deltaY / scale(),
            });
  
            // Move input edges
            node.inputEdgeIds.get().forEach((edgeId) => {
              const edge = edges().find((e) => e.id === edgeId);
              if (edge) {
                const prevEnd = edge.currEndPosition.get();
                edge.currEndPosition.set({
                  x: prevEnd.x - deltaX / scale(),
                  y: prevEnd.y - deltaY / scale(),
                });
              }
            });
  
            // Move output edges
            node.outputEdgeIds.get().forEach((edgeId) => {
              const edge = edges().find((e) => e.id === edgeId);
              if (edge) {
                const prevStart = edge.currStartPosition.get();
                edge.currStartPosition.set({
                  x: prevStart.x - deltaX / scale(),
                  y: prevStart.y - deltaY / scale(),
                });
              }
            });
          }
        });
      } else if (selectedNode() !== null) {
        const node = nodes().find((n) => n.id === selectedNode());
        if (node) {
          const prevPos = node.currPosition.get();
          node.currPosition.set({
            x: prevPos.x - deltaX / scale(),
            y: prevPos.y - deltaY / scale(),
          });
  
          // Move input edges for single node
          node.inputEdgeIds.get().forEach((edgeId) => {
            const edge = edges().find((e) => e.id === edgeId);
            if (edge) {
              const prevEnd = edge.currEndPosition.get();
              edge.currEndPosition.set({
                x: prevEnd.x - deltaX / scale(),
                y: prevEnd.y - deltaY / scale(),
              });
            }
          });
  
          // Move output edges for single node
          node.outputEdgeIds.get().forEach((edgeId) => {
            const edge = edges().find((e) => e.id === edgeId);
            if (edge) {
              const prevStart = edge.currStartPosition.get();
              edge.currStartPosition.set({
                x: prevStart.x - deltaX / scale(),
                y: prevStart.y - deltaY / scale(),
              });
            }
          });
        }
      }
    }
  }
