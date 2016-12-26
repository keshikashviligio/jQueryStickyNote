/**
 * Created by koco on 08.09.2016.
 */
$(document).ready(function () {
  $('.notes').jQueryStickyNote({
    dbService: 'backendService',
    dbServices: {
      backendService: {
        backendServiceOptions: {
          loadUrl: 'data.php',
          saveUrl: 'save.php',
          updateUrl: '',
          deleteUrl: '',
          deleteAllUrl: ''
        }
      }
    }
  });
  //$('.notes1').jQueryStickyNote({dbLocalStorageOptions: {
  //    localStorageKey: '_jq_sticky_note1'
  //}});
});