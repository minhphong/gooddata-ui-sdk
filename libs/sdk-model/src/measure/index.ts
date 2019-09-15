// (C) 2019 GoodData Corporation
import isEmpty = require("lodash/isEmpty");
import { Identifier, ObjQualifier } from "../base";
import { IFilter } from "../filter";

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export type IMeasureDefinitionType =
    | IMeasureDefinition
    | IArithmeticMeasureDefinition
    | IPoPMeasureDefinition
    | IPreviousPeriodMeasureDefinition;

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export interface IMeasure<T extends IMeasureDefinitionType = IMeasureDefinitionType> {
    measure: {
        localIdentifier: Identifier;
        definition: T;
        alias?: string;
        title?: string;
        format?: string;
    };
}

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export type MeasureAggregation = "sum" | "count" | "avg" | "min" | "max" | "median" | "runsum";

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export interface IMeasureDefinition {
    measureDefinition: {
        item: ObjQualifier;
        aggregation?: MeasureAggregation;
        filters?: IFilter[];
        computeRatio?: boolean;
    };
}

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export type ArithmeticMeasureOperator = "sum" | "difference" | "multiplication" | "ratio" | "change";

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export interface IArithmeticMeasureDefinition {
    arithmeticMeasure: {
        measureIdentifiers: Identifier[];
        operator: ArithmeticMeasureOperator;
    };
}

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export interface IPoPMeasureDefinition {
    popMeasureDefinition: {
        measureIdentifier: Identifier;
        popAttribute: ObjQualifier;
    };
}

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export interface IPreviousPeriodMeasureDefinition {
    previousPeriodMeasure: {
        measureIdentifier: Identifier;
        dateDataSets: IPreviousPeriodDateDataSet[];
    };
}

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export interface IPreviousPeriodDateDataSet {
    dataSet: ObjQualifier;
    periodsAgo: number;
}

//
//
//
/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export type MeasurePredicate = (measure: IMeasure) => boolean;

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export const anyMeasure: MeasurePredicate = _ => true;

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export const idMatchMeasure: (id: string) => MeasurePredicate = id => m => m.measure.localIdentifier === id;

//
// Type guards
//

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export function isMeasure(obj: any): obj is IMeasure {
    return !isEmpty(obj) && (obj as IMeasure).measure !== undefined;
}

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export function isSimpleMeasure(obj: any): obj is IMeasure<IMeasureDefinition> {
    return isMeasure(obj) && isMeasureDefinition(obj.measure.definition);
}

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export function isPoPMeasure(obj: any): obj is IMeasure<IPoPMeasureDefinition> {
    return isMeasure(obj) && isPoPMeasureDefinition(obj.measure.definition);
}

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export function isPreviousPeriodMeasure(obj: any): obj is IMeasure<IPreviousPeriodMeasureDefinition> {
    return isMeasure(obj) && isPreviousPeriodMeasureDefinition(obj.measure.definition);
}

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export function isArithmeticMeasure(obj: any): obj is IMeasure<IArithmeticMeasureDefinition> {
    return isMeasure(obj) && isArithmeticMeasureDefinition(obj.measure.definition);
}

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export function isMeasureDefinition(obj: any): obj is IMeasureDefinition {
    return !isEmpty(obj) && (obj as IMeasureDefinition).measureDefinition !== undefined;
}

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export function isPoPMeasureDefinition(obj: any): obj is IPoPMeasureDefinition {
    return !isEmpty(obj) && (obj as IPoPMeasureDefinition).popMeasureDefinition !== undefined;
}

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export function isPreviousPeriodMeasureDefinition(obj: any): obj is IPreviousPeriodMeasureDefinition {
    return !isEmpty(obj) && (obj as IPreviousPeriodMeasureDefinition).previousPeriodMeasure !== undefined;
}

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export function isArithmeticMeasureDefinition(obj: any): obj is IArithmeticMeasureDefinition {
    return !isEmpty(obj) && (obj as IArithmeticMeasureDefinition).arithmeticMeasure !== undefined;
}

//
// Functions
//

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export function measureId(measure: IMeasure): string {
    return measure.measure.localIdentifier;
}

/**
 * Tests whether the measure is set to compute ratio.
 *
 * @param measure - measure to to test
 * @returns true if computes ratio, false otherwise
 */
export function measureDoesComputeRatio(measure: IMeasure): boolean {
    if (isSimpleMeasure(measure)) {
        const computeRatio = measure.measure.definition.measureDefinition.computeRatio;

        return computeRatio ? computeRatio : false;
    }

    return false;
}
