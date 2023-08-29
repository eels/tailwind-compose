describe('framework-integration/classnames', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should correctly have a basic set of classnames', () => {
    const component = '[data-cy="basic-classnames-headline"]';

    cy.get(component).should('have.class', 'text-red-400 mb-4');
  });

  it('should correctly have a conditional class (string)', () => {
    const component = '[data-cy="conditional-classnames-button-string"]';

    cy.get(component).should('have.class', 'bg-red-400 block mb-4');
    cy.get(component).should('not.have.class', 'text-white');
    cy.get(component).click();
    cy.get(component).should('have.class', 'bg-red-400 block mb-4 text-white');
  });

  it('should correctly have a conditional class (array)', () => {
    const component = '[data-cy="conditional-classnames-button-array"]';

    cy.get(component).should('have.class', 'bg-red-800 block mb-4');
    cy.get(component).should('not.have.class', 'text-white bg-black');
    cy.get(component).click();
    cy.get(component).should('have.class', 'bg-red-800 block mb-4 text-white bg-black');
  });

  it('should correctly output the class after running through the `onDone` hook', () => {
    const component = '[data-cy="hooked-classnames-headline"]';

    cy.get(component).should('have.class', 'text-red-900 mb-4');
    cy.get(component).should('not.have.class', 'text-red-800');
  });
});
