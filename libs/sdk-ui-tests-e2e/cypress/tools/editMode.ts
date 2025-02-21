// (C) 2021-2022 GoodData Corporation

import { DashboardsList } from "./dashboardsList";
import { InsightsCatalog } from "./insightsCatalog";

const EDIT_BUTTON_SELECTOR = ".s-edit_button";
const SAVE_EDIT_BUTTON_SELECTOR = ".s-save_button";
const SAVING_EDIT_BUTTON_SELECTOR = ".s-saving_button";
const CANCEL_EDIT_BUTTON = ".s-cancel_button";

export class EditMode {
    getWrapperElement() {
        return cy.get(".dash-control-buttons");
    }

    saveButtonEnabled(expect = true) {
        cy.get(SAVE_EDIT_BUTTON_SELECTOR).should(expect ? "not.have.class" : "have.class", "disabled");
        return this;
    }

    save(waitForEnabled = true) {
        this.getWrapperElement().settled(SAVE_EDIT_BUTTON_SELECTOR).click({ force: true });
        if (waitForEnabled) {
            this.editButtonEnabled();
        }
        return this;
    }

    editButtonEnabled(expect = true) {
        cy.get(EDIT_BUTTON_SELECTOR).should(expect ? "not.have.class" : "have.class", "disabled");
        return this;
    }

    editButtonVisible(expect = true) {
        cy.get(EDIT_BUTTON_SELECTOR).should(expect ? "be.visible" : "not.be.visible");
        return this;
    }

    edit() {
        this.editButtonEnabled();
        this.getWrapperElement().settled(EDIT_BUTTON_SELECTOR).click();
        new InsightsCatalog().waitForCatalogLoad();
        return this;
    }

    isInEditMode(expect = true) {
        cy.get(SAVE_EDIT_BUTTON_SELECTOR).should(expect ? "exist" : "not.exist");
        if (!expect) {
            cy.get(SAVING_EDIT_BUTTON_SELECTOR).should(expect ? "exist" : "not.exist");
        }
        return this;
    }

    editNew() {
        new DashboardsList().clickAddDashboard();
        return this;
    }

    cancel() {
        cy.get(CANCEL_EDIT_BUTTON).click();
        return this;
    }

    discard() {
        cy.get(".s-discard_changes").click();
        return this;
    }

    closeDiscardChange() {
        cy.get(".s-dialog-close-button").click();
        return this;
    }
}
