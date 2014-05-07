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
    var editor = atom.workspace.getActiveEditor(),
      scope = editor.getCursorScopes();

    // if this is a doc block, add '* '
    if (/^comment\.block\.documentation/.test(scope[1])) {
      editor.insertNewlineBelow();
      editor.insertText('* ');
    }
    // line comment, add another line
    else if (/^comment\.line\./.test(scope[1])) {
      var comment = atom.syntax.getProperty(scope, 'editor.commentStart');
      editor.insertNewlineBelow();
      editor.insertText(comment);
    }
    else {
      editor.insertNewline();
    }
  }
};
