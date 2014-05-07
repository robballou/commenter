/**
 * Commenter
 *
 * Adds a command/keymap for adding newlines within comments. If you're
 * in a docblock or line comment, it will add a new comment line below.
 */
module.exports = {
  /**
   * Initialize the commenter package
   */
  activate: function() {
    atom.workspaceView.command('commenter:newline', this.newline);
  },

  /**
   * Add a newline in this comment
   */
  newline: function() {
    var editors = atom.workspaceView.getEditorViews();

    editors.forEach(function(editorView) {
      var scope = editorView.editor.getCursorScopes();
      console.log(editorView.editor);

      // if this is a doc block, add '* '
      if (/^comment\.block\.documentation/.test(scope[1])) {
        editorView.editor.insertNewlineBelow();
        editorView.editor.insertText('* ');
      }
      // line comment, add another line
      else if (/^comment\.line\./.test(scope[1])) {
        var comment = atom.syntax.getProperty(scope, 'editor.commentStart');
        editorView.editor.insertNewlineBelow();
        editorView.editor.insertText(comment);
      }
    });
  }
};
