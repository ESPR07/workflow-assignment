describe("The login event", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });
  it("successfully logins and adds a token, then logs out again and remove token", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("#registerModal").contains("Login").click();
    cy.wait(1000);
    cy.get("input#loginEmail").type("sindre@noroff.no");
    cy.get("input#loginPassword").type("Password{enter}");
    cy.should(() => {
      expect(localStorage.getItem("token")).to.not.equal(null);
    });
    cy.wait(1000);
    cy.get("header").contains("Logout").click();
  });

  it("throws an error on failed login", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("#registerModal").contains("Login").click();
    cy.wait(1000);
    cy.get("input#loginEmail").type("hubbadubba@noroff.no");
    cy.get("input#loginPassword").type("randomP{enter}");
    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        "Either your username was not found or your password is incorrect",
      );
    });
  });
});
