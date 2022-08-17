describe('framework-integration/compose', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should correctly have a basic component', () => {
    const component = cy.get('[data-cy="basic-headline"]');

    component.should('have.class', 'text-red-400 mb-4');
  });

  it('should correctly have a basic component via property', () => {
    const component = cy.get('[data-cy="basic-headline-property"]');

    component.should('have.class', 'text-red-800 mb-4');
  });

  it('should correctly have an extended component', () => {
    const component = cy.get('[data-cy="extended-headline"]');

    component.should('have.class', 'text-red-400 mb-4 underline');
  });

  it('should correctly have a basic component w/ attrs', () => {
    const component = cy.get('[data-cy="basic-email-field"]');

    component.should('have.class', 'border border-red-400 block mb-4');
    component.should('have.attr', 'type', 'email');
  });

  it('should correctly have a basic component via property w/ attrs', () => {
    const component = cy.get('[data-cy="basic-email-field-property"]');

    component.should('have.class', 'border border-red-800 block mb-4');
    component.should('have.attr', 'type', 'email');
  });

  it('should correctly have an extended component w/ attrs', () => {
    const component = cy.get('[data-cy="extended-button"]');

    component.should('have.class', 'bg-red-400 block mb-4');
    component.should('have.attr', 'disabled');
  });

  it('should correctly have a conditional class (string)', () => {
    let component = cy.get('[data-cy="conditional-button-string"]');

    component.should('have.class', 'bg-red-400 block mb-4');
    component.should('not.have.class', 'text-white');

    component.click();

    component = cy.get('[data-cy="conditional-button-string"]');

    component.should('have.class', 'bg-red-400 block mb-4 text-white');
  });

  it('should correctly have a conditional class (array)', () => {
    let component = cy.get('[data-cy="conditional-button-array"]');

    component.should('have.class', 'bg-red-800 block mb-4');
    component.should('not.have.class', 'text-white bg-black');

    component.click();

    component = cy.get('[data-cy="conditional-button-array"]');

    component.should('have.class', 'bg-red-800 block mb-4 text-white bg-black');
  });
});
