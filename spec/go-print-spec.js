'use babel';

import GoPrint from '../lib/go-print';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('GoPrint', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('go-print');
  });

  describe('when the go-print:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.go-print')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'go-print:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.go-print')).toExist();

        let goPrintElement = workspaceElement.querySelector('.go-print');
        expect(goPrintElement).toExist();

        let goPrintPanel = atom.workspace.panelForItem(goPrintElement);
        expect(goPrintPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'go-print:toggle');
        expect(goPrintPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.go-print')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'go-print:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let goPrintElement = workspaceElement.querySelector('.go-print');
        expect(goPrintElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'go-print:toggle');
        expect(goPrintElement).not.toBeVisible();
      });
    });
  });
});
