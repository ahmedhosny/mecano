import {components} from '../components'
import {at} from 'lodash'
import uuidv4 from 'uuid'

export class graph{
	constructor(inputData,mecano){
		// arguments
		this.name = inputData.name;
		this.root = inputData.root;
		this.nodes = inputData.nodes;
		this.edges = inputData.edges;
		this.mecano = mecano
		//
		this.components = components
	}
/**
 * Sets visited on all nodes
 */
	setVisited(bool){
		this.nodes.forEach((m,index) => {
			m.visited = bool
		})
	}

	setRootNode(){
		var _this = this
	    const _root = this.nodes.filter((obj) =>
	        obj.key === _this.root[0] // TODO : only accepts single start point for now
	    );
	    this.rootNode = _root[0]
	}

	setPosition(node){
		node.position = {
			'X':this.mecano.state.origin.X + this.mecano.state.grid.X*node.level.X,
			'Y':this.mecano.state.origin.Y + this.mecano.state.grid.Y*node.level.Y,
		}
	}

	getChildren(node){
		var out  = []
	    // get edges where this node is a source
	    const nextEdges = this.edges.filter((obj) =>
	    	obj.source === node.key
	    );
	    // go through these edges and add one node per edge
	    nextEdges.forEach((l,index) => {
	        // get nodes at the en dof these edges
	        const nextNodes = this.nodes.filter((obj) =>
	            obj.key === l.target
	        );
	        if (nextNodes.length !== 0) {out.push(nextNodes[0])}
	    });
	    return out
	}

	getPrimative(node){
		const state = this.mecano.state
    	const primativeClass = components[node.component].class;
	    const primative = new primativeClass(
	        node.shape,
	        state.angle,
	        node.position,
	        {
	            name : node.name,
	            params : node.params,
	            padding : state.padding
	        }
	    )
	    primative.component = node.component;
	    primative.key = node.key;
	    primative.level = node.level;
	    primative.type = 'primative';
	    primative.draw();
	    return primative;
	}


	getElastic(primativeList){
		// loop through edges
		this.edges.forEach((m,index) => {
			// get source primative
			const source = primativeList.find((obj) =>{
				return obj.key === m.source
			});
			// get target primative and its index
			const target = primativeList.find((obj) =>{
				return obj.key === m.target
			});
			const targetIndex = primativeList.findIndex((obj) =>{
				return obj.key === m.target
			});
			// get the target entry from components
			const targetEntry = this.components[source.component].target.find((obj) => {
				return obj.target === target.component
			});
			// create the elastic class
			const elasticClass = components[targetEntry.elastic].class
			// draw the elastic
            const elastic = new elasticClass(
                at(source.out,targetEntry.sourceOut),
                at(target.out,targetEntry.targetOut),
                {
                    angle : this.mecano.state.angle,
                    paramsFrom : source.params,
                    paramsTo : target.params
                }
            )
            elastic.component = targetEntry.elastic
            elastic.key = uuidv4()
            elastic.type = 'elastic';
            elastic.draw()
            primativeList.splice(targetIndex,0,elastic)
		});
	}



	processNode(x,levelX,levelY,outputData){
		// visit and set its level + screen position
		x.visited = true;
		x.level = {'X':levelX,'Y':levelY}
		this.setPosition(x)
		// add primative
		outputData.push(this.getPrimative(x))
	}


	traverse(){
		var outputData = []
		// set all visited to false
		this.setVisited(false)
		// make queue
		var queue = [];
		// set rootNode and put in queue
		this.setRootNode()
		queue.push(this.rootNode)
		// set level counters
		var levelX = 0
		var levelY = 0
		//
		var elementsToDepthIncrease = 1;
		var nextElementsToDepthIncrease = 0;
		//
		do {
			var x = queue.shift();
			// if not visited
			if (x.visited === false){
				// process node
				this.processNode(x,levelX,levelY,outputData)
				// get children
				var getChildren = this.getChildren(x)
				nextElementsToDepthIncrease += getChildren.length;
				// if we are indeed going to a next levelX
			    if (--elementsToDepthIncrease === 0) {
			      	elementsToDepthIncrease = nextElementsToDepthIncrease;
			      	nextElementsToDepthIncrease = 0;
			      	levelX++
			      	// reset levelY
			      	levelY = 0
			    }
			    // otherwise branch into levelY
			    else{
			    	levelY++
			    }
				getChildren.forEach((m,index) => {
					// if not visited, add to queue
					if (m.visited === false){
						queue.push(m)
					}
				});
			}
		}
		while (queue.length !== 0);
		console.log(outputData)
		// now add elastics to the outputData
		// only if there are two primatives or more
		if (outputData.length > 1){
			this.getElastic(outputData)
		}
		return outputData;
	}
}


// void breadthFirst(Node parent, int maxDepth) {

//   if(maxDepth < 0) {
//     return;
//   }

//   Queue<Node> nodeQueue = new ArrayDeque<Node>();
//   nodeQueue.add(parent);

//   int currentDepth = 0,
//       elementsToDepthIncrease = 1,
//       nextElementsToDepthIncrease = 0;

//   while (!nodeQueue.isEmpty()) {
//     Node current = nodeQueue.poll();
//     process(current);

//     nextElementsToDepthIncrease += current.numberOfChildren();


//     if (--elementsToDepthIncrease == 0) {
//       if (++currentDepth > maxDepth) return;
//       elementsToDepthIncrease = nextElementsToDepthIncrease;
//       nextElementsToDepthIncrease = 0;
//     }
//     for (Node child : current.children()) {
//       nodeQueue.add(child);
//     }
//   }

// }

// void process(Node node) {
//   // Do your own processing here. All nodes handed to
//   // this method will be within the specified depth limit.
// }


// var queue = [];
// queue.push(2);         // queue is now [2]
// queue.push(5);         // queue is now [2, 5]
// var i = queue.shift(); // queue is now [5]
// alert(i);              // displays 2


   // Set all nodes to "not visited";

   // q = new Queue();

   // q.enqueue(initial node); pysh

   // while ( q ≠ empty ) do
   // {
   //    x = q.dequeue(); remove from que

   //    if ( x has not been visited )
   //    {
   //       visited[x] = true;         // Visit node x !

   //       for ( every edge (x, y)  /* we are using all edges ! */ )
   //          if ( y has not been visited )
	  //      q.enqueue(y);       // Use the edge (x,y) !!!
   //    }
   // }
   //
// /**
//  * Adds tags to primatives
//  * @param  {list} data - data to manipulate
//  */
// function getTags(data,mecano){
//     var originalData = data.slice()
//     originalData.forEach((n,index) => {
//         if (n.type==='primative'){
//             // loop through available tags
//             n.tags.forEach((m,index) => {
//                 var tagClass = components[m.component].class // m.component is 'shape' , class is Shape , class is bottomTag
//                 var component = new tagClass(
//                     m,
//                     n.tagAnchors
//                 )
//                 component.draw()
//                 component.component = m.component
//                 data.push(component)
//             });
//         }
//     });
// }
