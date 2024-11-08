import { NodeDataReference } from "../node-data-reference";
import type { CallFunctionNode } from "./call-function.node";
import { Node } from "./node";

export interface AsyncActionNode extends CallFunctionNode {
    isPureFunc: boolean;
    isConstFunc: boolean;
    functionReference: NodeDataReference;
    proxyFactoryFunctionName?: string;
}
