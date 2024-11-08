import { HeadedNodeControl } from "../../controls/nodes/headed-node-control";
import { NodeControl } from "../../controls/nodes/node.control";
import type { AsyncActionNode } from "../../data/nodes/async-action.node";
import { Node } from "../../data/nodes/node";
import { PinProperty } from "../../data/pin/pin-property";
import { MathFunctionNodeParser } from "./math-function-node.parser";
import { NodeDataReferenceParser } from "../node-data-reference.parser";
import { NodeParser } from "../node.parser";
import { ParsingNodeData } from "../parsing-node-data";
import { insertSpacesBetweenCapitalizedWords, prettifyText, findFriendlyName } from "../../utils/text-utils";
import { IconLibrary } from "../../controls/utils/icon-library";
import { UnrealNodeClass } from "../../data/classes/unreal-node-class";
import { FoldableHeadedNodeControl } from "../../controls/nodes/foldable-headed-node.control";
import { StringFunctionNodeParser } from "./string-function-node.parser";
import { ArrayFunctionNodeParser } from "./array-function-node.parser";
import { Constants } from "../../constants";


export class AsyncActionNodeParser extends NodeParser {

    private static readonly _FUNCTION_MAP = {
        "/Script/Engine.KismetMathLibrary": (d) => new MathFunctionNodeParser().parse(d),
        "/Script/Engine.KismetStringLibrary": (d) => new StringFunctionNodeParser().parse(d),
        "/Script/Engine.KismetArrayLibrary": (d) => new ArrayFunctionNodeParser().parse(d),
    }

    constructor() {
        super({
            "bIsPureFunc": (node: AsyncActionNode, value: string) => { node.isPureFunc = (value === "True"); },
            "bIsConstFunc": (node: AsyncActionNode, value: string) => { node.isConstFunc = (value === "True"); },
            "ProxyFactoryFunctionName": (node: AsyncActionNode, value: string) => {
                node.proxyFactoryFunctionName = value
                node.title = insertSpacesBetweenCapitalizedWords(value.replace(/"/g, ""));
            },
        });
    }

    public parse(data: ParsingNodeData): NodeControl {
        data.node.latent = true
        const node = data.node as AsyncActionNode;

        this.parseProperties(data);

        node.backgroundColor = node.isPureFunc === true ? Constants.DEFAULT_FUNC_PURE_BACKGROUND_COLOR : Constants.DEFAULT_FUNC_BACKGROUND_COLOR;
        let icon = IconLibrary.FUNCTION;

        // Special case for construction node
        if (node.class === UnrealNodeClass.ASYNC_ACTION) {
            icon = this.handleFunctionNode(node);
        }

        const parser = AsyncActionNodeParser._FUNCTION_MAP[node.functionReference?.memberParent?.classPath];
        if (parser) return parser(data);

        if (node.advancedPinDisplay !== undefined) {
            return new FoldableHeadedNodeControl(node, icon);
        } else {
            return new HeadedNodeControl(node, icon);
        }
    }

    private handleFunctionNode(node: AsyncActionNode) {
        node.backgroundColor = Constants.DEFAULT_FUNC_ENTRY_BACKGROUND_COLOR;
        return IconLibrary.FUNCTION;
    }

}
