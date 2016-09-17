/**
 * Created by koco on 08.09.2016.
 */
$(document).ready(function(){
    $('.notes').jQueryStickyNote({});
    $('.notes1').jQueryStickyNote({dbLocalStorageOptions: {
        localStorageKey: '_jq_sticky_note1'
    }});
});