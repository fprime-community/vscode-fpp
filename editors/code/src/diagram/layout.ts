import { ElkLayoutEngine } from "sprotty-elk";
import { SModelIndex } from "sprotty-protocol";
import { SGraph } from 'sprotty-protocol/lib/model';

export class FppLayoutEngine extends ElkLayoutEngine {
    /**
     * Transform the Sprotty graph into an ELK graph, invoke the ELK layout engine,
     * apply the results to the original graph, and return it.
     *
     * _Note:_ The basic type of the root element must be `graph`.
     */
    override layout(sgraph: SGraph, index?: SModelIndex): SGraph | Promise<SGraph> {
        if (this.getBasicType(sgraph) !== 'graph') {
            return sgraph;
        }
        if (!index) {
            index = new SModelIndex();
            index.add(sgraph);
        }

        // STEP 1: Transform the Sprotty graph into an ELK graph with optional pre-processing
        const elkGraph = this.transformGraph(sgraph, index);
        if (this.preprocessor) {
            this.preprocessor.preprocess(elkGraph, sgraph, index);
        }

        // STEP 2: Invoke the ELK layout engine
        return this.elk.layout(elkGraph).then(result => {
            // STEP 3: Apply the results with optional post-processing to the original graph
            if (this.postprocessor) {
                this.postprocessor.postprocess(result, sgraph, index!);
            }
            this.applyLayout(result, index!);
            return sgraph;
        });
    }
}
