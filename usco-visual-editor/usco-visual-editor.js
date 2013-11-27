Polymer('usco-visual-editor', {

  selectedObject : null,

  //public api
	addToScene: function ( object )
	{
		try
		{
			this.rootAssembly.add( object );

      //just a test
      for( var i =0; i<object.children.length;i++)
      {
        var child = object.children[i];
        if(child.name !== "" && child.name != "bob")
        {
            console.log("child",child);
            var lineGeometry = new THREE.Geometry();
	          var vertArray = lineGeometry.vertices;
	          vertArray.push( new THREE.Vector3(), child.position.clone() );
	          lineGeometry.computeLineDistances();
	          var lineMaterial = new THREE.LineDashedMaterial( { color: 0x00cc00, dashSize: 4, gapSize: 2 } );
	          var line = new THREE.Line( lineGeometry, lineMaterial );
            line.name = "bob";

            var arrowHead = new THREE.Mesh(new THREE.CylinderGeometry(0, 4, 15, 5, 5, false), new THREE.MeshBasicMaterial({color:0x00cc00}));
            //arrowHead.up = new THREE.Vector3(0,1,0);

            arrowHead.position = child.position.clone().divideScalar( 2 );//this.arrowHeadRootPosition;
            arrowHead.lookAt( child.position );
            arrowHead.rotateX(Math.PI/2);
	          line.add( arrowHead );
            
            //object.material.wireframe = true;
            //child.material.wireframe = true;
            object.add(line);
        }
       }
		}
		catch(error)
		{
			console.log("Failed to add object, to scence: error", error)
		}
	}
});
