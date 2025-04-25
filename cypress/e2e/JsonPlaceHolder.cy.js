describe('Pruebas de navegación con Cypress - Json Placeholder', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.visit('https://jsonplaceholder.typicode.com/');
    });
  
    it('Navegar a Guide y luego a Repositorio', () => {
      cy.contains('a','Guide').click();
      cy.url().should('include', '/guide');
      cy.contains('a','typicode').click();

      cy.origin('https://github.com', () => {
        cy.url().should('eq', 'https://github.com/typicode');
      });
    });

    it('Volver al Home desde Guide usando el logo de JSONPlaceholder', () => {
      cy.visit('https://jsonplaceholder.typicode.com/guide/');
      cy.contains('a','JSONPlaceholder').click();
      cy.url().should('eq', 'https://jsonplaceholder.typicode.com/');
    });
  
    it('Navegar a My JSON Server y verificar el título y navegar hasta Try Server', () => {
      cy.contains('a', 'My JSON Server').click();
      cy.origin('https://my-json-server.typicode.com', () => {
        cy.url().should('eq', 'https://my-json-server.typicode.com/');
        cy.title().should('contain', 'My JSON Server');
        cy.get('a.button[href="/typicode/demo"]').first().click();
        cy.url().should('include', 'typicode/demo');
      });
    });
  
    it('Ir hacia atrás y adelante con el navegador', () => {
      cy.contains('a','Guide').click();
      cy.url().should('include', '/guide');
      cy.go('back');
      cy.url().should('eq', 'https://jsonplaceholder.typicode.com/');
      cy.go('forward');
      cy.url().should('eq', 'https://jsonplaceholder.typicode.com/guide/');
      cy.contains('a','typicode').click();

      cy.origin('https://github.com', () => {
        cy.url().should('eq', 'https://github.com/typicode');
      });
    });
  });