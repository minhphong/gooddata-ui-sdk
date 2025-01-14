// (C) 2021 GoodData Corporation
import { Chart } from "./chart";
import { Table } from "./table";

type ExportTypes = "csv" | "xlsx";

export class DrillToModal {
    getElement() {
        return cy.get(".s-drill-modal-dialog");
    }

    getTitleElement() {
        return this.getElement().find(".s-drill-title");
    }

    getChart() {
        return new Chart(".s-drill-modal-dialog");
    }

    getTable() {
        return new Table(".s-drill-modal-dialog");
    }

    close() {
        this.getElement().find(".s-drill-close-button").click();
        this.getElement().should("not.exist");
    }

    getFooterElement() {
        return this.getElement().find(".s-drill-modal-dialog-footer");
    }

    getFooterTitleElement() {
        return this.getFooterElement().find(".s-export-drilled-insight");
    }

    openFooter() {
        this.getFooterTitleElement().click();
        return this;
    }

    hoverFooterTitle() {
        this.getFooterTitleElement().trigger("mouseover");
        return this;
    }

    clickExportMenuOption(type: ExportTypes) {
        cy.get(`.s-export-drilled-insight-${type}`).should("exist");
        cy.get(`.s-export-drilled-insight-${type}`).click();
        return this;
    }

    getFooterTooltipElement() {
        return cy.get(".gd-bubble");
    }

    getModalText() {
        return this.getElement().find(".gd-visualization-content .gd-typography--h2");
    }

    waitForDrillModalViz() {
        this.getElement().find(".gd-loading-equalizer-wrap").should("not.exist");
        return this;
    }

    back() {
        this.getElement().find(".s-drill-reset-button").click();
        return this;
    }
}
