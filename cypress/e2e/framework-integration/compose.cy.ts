describe('framework-integration/compose', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should correctly have a basic component', () => {
    const component = '[data-cy="basic-headline"]';

    cy.get(component).should('have.class', 'text-red-400 mb-4');
    cy.get(component).should('have.prop', 'tagName').should('eq', 'H1');
  });

  it('should correctly have a basic component via property', () => {
    const component = '[data-cy="basic-headline-property"]';

    cy.get(component).should('have.class', 'text-red-800 mb-4');
    cy.get(component).should('have.prop', 'tagName').should('eq', 'H1');
  });

  it('should correctly have an extended component', () => {
    const component = '[data-cy="extended-headline"]';

    cy.get(component).should('have.class', 'text-red-400 mb-4 underline');
    cy.get(component).should('have.prop', 'tagName').should('eq', 'H1');
  });

  it('should correctly have a basic component w/ attrs', () => {
    const component = '[data-cy="basic-email-field"]';

    cy.get(component).should('have.class', 'border border-red-400 block mb-4');
    cy.get(component).should('have.attr', 'type', 'email');
    cy.get(component).should('have.prop', 'tagName').should('eq', 'INPUT');
  });

  it('should correctly have a basic component via property w/ attrs', () => {
    const component = '[data-cy="basic-email-field-property"]';

    cy.get(component).should('have.class', 'border border-red-800 block mb-4');
    cy.get(component).should('have.attr', 'type', 'email');
    cy.get(component).should('have.prop', 'tagName').should('eq', 'INPUT');
  });

  it('should correctly have an extended component w/ attrs', () => {
    const component = '[data-cy="extended-button"]';

    cy.get(component).should('have.class', 'bg-red-400 block mb-4');
    cy.get(component).should('have.attr', 'disabled');
    cy.get(component).should('have.prop', 'tagName').should('eq', 'BUTTON');
  });

  it('should correctly have an `as (string)` transformed component', () => {
    const component = '[data-cy="basic-button-as-string"]';

    cy.get(component).should('have.class', 'bg-red-400 block mb-4');
    cy.get(component).should('have.prop', 'tagName').should('eq', 'DIV');
  });

  it('should correctly have an `as (component)` transformed component', () => {
    const component = '[data-cy="basic-button-as-component"]';

    cy.get(component).should('have.class', 'bg-red-400 block mb-4');
    cy.get(component).should('have.prop', 'tagName').should('eq', 'H1');
  });

  it('should correctly have a conditional class (string)', () => {
    const component = '[data-cy="conditional-button-string"]';

    cy.get(component).should('have.class', 'bg-red-400 block mb-4');
    cy.get(component).should('not.have.class', 'text-white');
    cy.get(component).should('have.prop', 'tagName').should('eq', 'BUTTON');
    cy.get(component).click();
    cy.get(component).should('have.class', 'bg-red-400 block mb-4 text-white');
  });

  it('should correctly have a conditional class (array)', () => {
    const component = '[data-cy="conditional-button-array"]';

    cy.get(component).should('have.class', 'bg-red-800 block mb-4');
    cy.get(component).should('not.have.class', 'text-white bg-black');
    cy.get(component).should('have.prop', 'tagName').should('eq', 'BUTTON');
    cy.get(component).click();
    cy.get(component).should('have.class', 'bg-red-800 block mb-4 text-white bg-black');
  });

  it('should correctly output the class after running through the `onDone` hook', () => {
    const component = '[data-cy="hooked-headline"]';

    cy.get(component).should('have.class', 'text-red-900 mb-4');
    cy.get(component).should('not.have.class', 'text-red-800');
  });
});
