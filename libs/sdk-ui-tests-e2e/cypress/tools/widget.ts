// (C) 2021-2022 GoodData Corporation

import { Chart } from "./chart";
import { Table } from "./table";
import { Kpi } from "./kpi";
import { InsightsCatalog, InsightTitle } from "./insightsCatalog";

const MAXIMUM_TIMEOUT = Cypress.env("timeForInsightLoading");

export class Widget {
    constructor(private index: number) {}

    getElementSelector() {
        return `.s-dash-item-${this.index}`;
    }

    getElement() {
        return cy.get(this.getElementSelector());
    }

    waitChartLoaded() {
        this.getElement()
            .find(".visualization-value-loading", { timeout: MAXIMUM_TIMEOUT })
            .should("not.exist");
        this.getElement().find(".s-loading").should("not.exist");
        return this;
    }

    waitKpiLoaded() {
        this.getElement().find(".content-loaded.widget-loaded").should("exist");
        this.getElement().find(".is-alert-evaluating").should("not.exist");
        return this;
    }

    waitTableLoaded() {
        this.getElement().find(".s-loading").should("not.exist");
        this.getElement().find(".s-loading-done").should("exist");
        return this;
    }

    isLoading(expected = true) {
        this.getElement()
            .find(".s-loading-done, .content-loaded.widget-loaded, .visualization-value-loading")
            .should(expected ? "exist" : "not.exist");
        return this;
    }

    setTitle(title: string) {
        this.getElement().find(".s-headline").click().type(`${title}{enter}`);
        return this;
    }

    getChart() {
        return new Chart(this.getElementSelector());
    }

    getTable() {
        return new Table(this.getElementSelector());
    }

    getKPI() {
        return new Kpi(this.getElementSelector());
    }

    removeKPIWidget() {
        this.getElement().click().get(".dash-item-action-delete").click();
        return this;
    }

    removeVizWidget() {
        this.getElement().click().get(".s-delete-insight-item").click();
        return this;
    }

    exists(expect = true) {
        this.getElement().should(expect ? "exist" : "not.exist");
        return this;
    }

    isTitleVisible(expect = true) {
        this.getElement()
            .find(".s-headline")
            .should(expect ? "exist" : "not.exist");
        return this;
    }

    hasAlert(expect = true) {
        this.getElement()
            .find(".dash-item-content")
            .should(expect ? "have.class" : "not.have.class", "has-set-alert");
        return this;
    }

    hasTriggeredAlert(expect = true) {
        this.getElement()
            .find(".dash-item-content")
            .should(expect ? "have.class" : "not.have.class", "is-alert-triggered");
        return this;
    }

    /**
     * This checks actual width in grid of 12
     * @param size - size of widget
     * @returns
     */
    hasWidth(size: number) {
        this.getElement()
            .parents(".s-fluid-layout-column")
            .should("have.class", `s-fluid-layout-column-width-${size}`);
        return this;
    }

    hover() {
        this.getElement().realHover();
        return this;
    }

    openTooltip() {
        this.getElement().find(".s-description-trigger").click();
        return this;
    }

    tooltipHoverExist(expect = true) {
        this.getElement()
            .find(".s-description-trigger")
            .should(expect ? "exist" : "not.exist");
        return this;
    }

    tooltipHasText(text: string) {
        cy.get(".s-gd-description-panel").should("have.text", text);
        return this;
    }

    getEditableLabelElement() {
        return this.getElement().find(".s-editable-label");
    }

    hasTitle(title: string) {
        this.getElement().find(".s-headline").should("have.text", title);
        return this;
    }

    isSelected() {
        this.getElement().should("have.class", "is-selected");
        return this;
    }

    dragBefore(name: InsightTitle) {
        return this.drag(name, "prev");
    }

    dragAfter(name: InsightTitle) {
        return this.drag(name, "next");
    }

    drag(name: InsightTitle, offset: "next" | "prev") {
        const catalog = new InsightsCatalog();
        catalog.searchExistingInsight(name);
        cy.get(catalog.getInsightSelector(name)).parent().trigger("dragstart", { force: true });
        cy.get(`.dropzone.${offset}`).eq(this.index).trigger("dragenter");
        return this;
    }

    add(name: InsightTitle, offset: "next" | "prev") {
        const catalog = new InsightsCatalog();
        catalog.searchExistingInsight(name);
        cy.get(catalog.getInsightSelector(name)).parent().trigger("dragstart", { force: true });
        cy.get(`.dropzone.${offset}`).eq(this.index).trigger("drop", { force: true });
        return this;
    }

    hasPlaceholderTitle(placeholderTitle: string) {
        this.getElement()
            .find(".s-headline")
            .click()
            .find("textarea")
            .should("have.prop", "placeholder", placeholderTitle);
        return this;
    }

    getTitle() {
        return this.getElement().find(".s-headline");
    }

    addBefore(name: InsightTitle) {
        return this.add(name, "prev");
    }
}
