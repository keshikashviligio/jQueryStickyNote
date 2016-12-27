/**
 * Created by koco on 08.09.2016.
 */
$(document).ready(function () {

  note.NoteManager.THEMES = $.extend(note.NoteManager.THEMES, [{name: 'custom', value: '#878787'}]);

  $('.notes').jQueryStickyNote({
    dbService: 'backendService',
    dbServices: {
      backendService: {
        backendServiceOptions: {
          loadUrl: 'data.php',
          saveUrl: 'save.php',
          updateUrl: 'update.php',
          deleteUrl: 'delete.php',
          deleteAllUrl: ''
        }
      }
    }
  });
  //$('.notes1').jQueryStickyNote({dbLocalStorageOptions: {
  //    localStorageKey: '_jq_sticky_note1'
  //}});
});