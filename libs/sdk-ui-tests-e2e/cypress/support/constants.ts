// (C) 2021 GoodData Corporation

export const getHost = (): string => Cypress.env("HOST");

export const getProjectId = (): string => Cypress.env("WORKSPACE");

export const getUsername = (): string => Cypress.env("USERNAME");

export const getPassword = (): string => Cypress.env("PASSWORD");
