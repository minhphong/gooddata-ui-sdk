// (C) 2023 GoodData Corporation
import { getHost, getProjectId, getBackend } from "../support/constants";

export const getTigerAuthToken = (): string => Cypress.env("TIGER_API_TOKEN");

interface IApiRequestOptions {
    failOnStatusCode?: boolean;
    useVendorContentType?: boolean;
}

const defaultRequestOptions: IApiRequestOptions = {
    failOnStatusCode: true,
    useVendorContentType: true,
};

export class Api {
    static request(method: string, url: string, body?: any, options: IApiRequestOptions = {}): any {
        const { failOnStatusCode, useVendorContentType } = { ...defaultRequestOptions, ...options };
        return cy.request({
            method,
            failOnStatusCode,
            url: url.startsWith("/") ? `${getHost()}${url}` : url,
            headers: {
                Authorization: `BEARER ${getTigerAuthToken()}`,
                // use vendor specific content-type, described in https://www.gooddata.com/developers/cloud-native/doc/2.2/api-and-sdk/api/#entity-api-interface
                "Content-Type": useVendorContentType
                    ? "application/vnd.gooddata.api+json"
                    : "application/json",
            },
            body,
        });
    }

    static setEarlyAccess(workspace: string, value: string = "develop") {
        const body = {
            data: {
                id: workspace,
                type: "workspace",
                attributes: {
                    earlyAccess: value,
                },
            },
        };

        const url = `/api/v1/entities/workspaces/${workspace}`;

        return Api.request("PATCH", url, body);
    }

    static injectAuthHeader(userToken: string) {
        cy.log("Intercept to Inject Authorization header");
        cy.intercept("/api/**", { middleware: true }, (req) => {
            req.headers["Authorization"] = `Bearer ${userToken}`;
        });
    }

    postDrillDownAttribute = (drillFromAttribute: string, payload: string) => {
        cy.request({
            method: "POST",
            url: `${getHost()}/gdc/md/${getProjectId()}/obj/${drillFromAttribute}`,
            headers: {
                "Content-Type": "application/json",
            },
            body: payload,
        }).then((response) => {
            expect(response.status).eq(200);
        });
    };

    postDrillDownHierarchy = (drillId: string, drillFromAttribute: string, drillToAttribute: string) => {
        cy.request({
            method: "POST",
            url: `${getHost()}/api/v1/entities/workspaces/${getProjectId()}/attributeHierarchies`,
            headers: {
                Authorization: `BEARER ${getTigerAuthToken()}`,
                "Content-Type": "application/vnd.gooddata.api+json"
            },
            body: JSON.stringify({
                data: {
                    type: "attributeHierarchy",
                    id: drillId,
                    attributes: {
                        title: drillId,
                        description: drillId,
                        tags: ["string"],
                        areRelationsValid: true,
                        content: {
                            attributes: [
                                {
                                    identifier: {
                                        type: "attribute",
                                        id: drillFromAttribute,
                                    },
                                },
                                {
                                    identifier: {
                                        type: "attribute",
                                        id: drillToAttribute,
                                    },
                                },
                            ],
                        },
                    },
                },
            }),
        }).then((response) => {
            cy.log(
                "here is hierachy",
                `${getHost()}/api/v1/entities/workspaces/${getProjectId()}/attributeHierarchies`,
            );
            expect(response.status).eq(200);
        });
    };

    deleteDrillDownHierarchy = (drillId: string) => {
        cy.request({
            method: "DELETE",
            url: `${getHost()}/api/v1/entities/workspaces/${getProjectId()}/attributeHierarchies/${drillId}`,
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            expect(response.status).eq(200);
        });
    };

    setUpDrillDownAttribute = (drillFromAttribute: string, drillToAttribute?: string) => {
        if (getBackend() !== "BEAR") {
            return;
        }

        cy.request({
            method: "GET",
            url: `${getHost()}/gdc/md/${getProjectId()}/obj/${drillFromAttribute}`,
            headers: {
                Accept: "application/json",
            },
        }).then((response) => {
            expect(response.status).eq(200);
            const payload = response.body;
            drillToAttribute
                ? (payload.attribute.content.drillDownStepAttributeDF = `/gdc/md/${getProjectId()}/obj/${drillToAttribute}`)
                : delete payload.attribute.content.drillDownStepAttributeDF;
            this.postDrillDownAttribute(drillFromAttribute, payload);
        });
    };
}
