/**
 * Created by pratik on 22/12/17.
 */
/**
 * Available Icon Libraries
 */
export enum Icon {
  fontawesome = 'fa',
  material = 'mat',
}

const faFaCaretIcon  = 'fa fa-caret-down';

const faFaTimesIcon    = 'fa fa-times';
/**
 * Icon Map Config
 */
const ICON_MAPPING =
[
  {
    component: 'datepicker_previous',
    fa: 'fa fa-chevron-left',
    mat: 'keyboard_arrow_left',
  },
  {
    component: 'datepicker_calendar',
    fa: 'fa fa-calendar',
    mat: 'date_range',
  },
  {
    component: 'datepicker_next',
    fa: 'fa fa-chevron-right',
    mat: 'keyboard_arrow_right',
  },
  {
    component: 'datepicker_previous_fast',
    fa: 'fa fa-step-backward',
    mat: 'fast_rewind',
  },
  {
    component: 'datepicker_next_fast',
    fa: 'fa fa-step-forward',
    mat: 'fast_forward',
  },
  {
    component: 'accordion_expand',
    fa: 'fa fa-plus',
    mat: 'add',
  },
  {
    component: 'accordion_collapse',
    fa: 'fa fa-minus',
    mat: 'remove',
  },
  {
    component: 'tree_expand',
    fa: 'fa fa-chevron-down',
    mat: 'keyboard_arrow_down',
  },
  {
    component: 'tree_collapse',
    fa: 'fa fa-chevron-right',
    mat: 'keyboard_arrow_right',
  },
  {
    component: 'dropdown_caret',
    fa: faFaCaretIcon,
    mat: 'arrow_drop_down',
  },
  {
    component: 'tab_close',
    fa: faFaTimesIcon,
    mat: 'close',
  },
  {
    component: 'window_close',
    fa: faFaTimesIcon,
    mat: 'close',
  },
  {
    component: 'window_maximize',
    fa: 'fa fa-window-maximize',
    mat: 'open_with',
  },
  {
    component: 'window_restore',
    fa: 'fa fa-window-restore',
    mat: 'indeterminate_check_box',
  },
  {
    component: 'paginator_previous',
    fa: 'fa fa-angle-left',
    mat: 'keyboard_arrow_left',
  },
  {
    component: 'paginator_next',
    fa: 'fa fa-angle-right',
    mat: 'keyboard_arrow_right',
  },
  {
    component: 'paginator_first',
    fa: 'fa fa-angle-double-left',
    mat: 'first_page',
  },
  {
    component: 'paginator_last',
    fa: 'fa fa-angle-double-right',
    mat: 'last_page',
  },
  {
    component: 'itemselector_caretup',
    fa: 'fa fa-caret-up',
    mat: 'arrow_drop_up',
  },
  {
    component: 'itemselector_caretdown',
    fa: faFaCaretIcon,
    mat: 'arrow_drop_down',
  },
  {
    component: 'itemselector_arrowup',
    fa: 'fa fa-arrow-up',
    mat: 'arrow_upward',
  },
  {
    component: 'itemselector_arrowdown',
    fa: 'fa fa-arrow-down',
    mat: 'arrow_downward',
  },
  {
    component: 'itemselector_arrowleft',
    fa: 'fa fa-arrow-left',
    mat: 'keyboard_arrow_left',
  },
  {
    component: 'itemselector_arrowright',
    fa: 'fa fa-arrow-right',
    mat: 'keyboard_arrow_right',
  },
  {
    component: 'tab_previous',
    fa: 'fa fa-angle-left fa-2x',
    mat: 'keyboard_arrow_left',
  },
  {
    component: 'tab_next',
    fa: 'fa fa-angle-right  fa-2x',
  },
  {
    component: 'tab_close',
    fa: faFaTimesIcon,
    mat: 'close',
  },
  {
    component: 'fieldset_expand',
    fa: 'fa fa-plus',
    mat: 'add',
  },
  {
    component: 'fieldset_collpase',
    fa: 'fa fa-minus',
    mat: 'remove',
  },
  {
    component: 'carousel_previous',
    fa: 'fa fa-angle-left fa-2x',
    mat: 'keyboard_arrow_left',
  },
  {
    component: 'carousel_next',
    fa: 'fa fa-angle-right  fa-2x',
  },
  {
    component: 'dockbar_close',
    fa: faFaTimesIcon,
    mat: 'close',
  },
  {
    component: 'notify_close',
    fa: faFaTimesIcon,
    mat: 'close',
  },
  {
    component: 'sidenav_bar',
    fa: 'fa fa-bars fa-2x',
    mat: 'menu',
  },
  {
    component: 'sidenav_close',
    fa: faFaTimesIcon,
    mat: 'close',
  },
  {
    component: 'datagrid_arrowdown',
    fa: 'fa fa-arrow-down',
    mat: 'arrow_downward',
  },
  {
    component: 'datagrid_arrowup',
    fa: 'fa fa-arrow-up',
    mat: 'arrow_upward',
  },
  {
    component: 'datagrid_list',
    fa: 'fa fa-th-list',
    mat: 'view_list',
  },
  {
    component: 'datagrid_expand',
    fa: 'fa fa-caret-right',
    mat: '',
  },
  {
    component: 'datagrid_collapse',
    fa: faFaCaretIcon,
    mat: 'arrow_drop_down',
  },
  {
    component: 'datagrid_collapse',
    fa: faFaCaretIcon,
    mat: 'arrow_drop_down',
  },
  {
    component: 'datagrid_filter',
    fa: 'fa fa-filter',
    mat: 'filter_list',
  },
  {
    component: 'tree_filter',
    fa: 'fa fa-filter',
    mat: 'filter_list',
  },
  {
    component: 'data_check',
    fa: 'fa fa-check',
    mat: 'check',
  },
  {
    component: 'button_caret-down',
    fa: faFaCaretIcon,
    mat: 'arrow_drop_down',
  },
  {
    component: 'menubar_ravelry',
    fa: 'fa fa-ravelry',
    mat: 'done',
  },
  {
    component: 'sidenav-angle-up',
    fa: 'fa fa-angle-up',
    mat: 'keyboard_arrow_up',
  },
  {
    component: 'sidenav-angle-down',
    fa: 'fa fa-angle-down',
    mat: 'keyboard_arrow_down',
  },
  {
    component: 'window-msgtype-error',
    fa: 'fa fa-exclamation-triangle fa-2x fa-fw',
    mat: 'keyboard_arrow_down',
  },
  {
    component: 'window-msgtype-warning',
    fa: 'fa fa-exclamation-triangle fa-2x fa-fw',
    mat: 'keyboard_arrow_down',
  },
  {
    component: 'window-msgtype-help',
    fa: 'fa fa-question-circle fa-2x fa-fw',
    mat: 'keyboard_arrow_down',
  },
  {
    component: 'window-msgtype-confirm',
    fa: 'fa fa-check-circle fa-2x fa-fw',
    mat: 'keyboard_arrow_down',
  },
  {
    component: 'horizontal-tree-expanded',
    fa: 'fa fa-caret-right fa-fw',
    mat: 'keyboard_arrow_right',
  },
  {
    component: 'horizontal-tree-collapse',
    fa: 'fa fa-caret-left fa-fw',
    mat: 'keyboard_arrow_left',
  },
  {
    component: 'button-loading-icon',
    fa: 'fa fa-refresh fa-spin',
    mat: 'cached',
  },
  {
    component: 'datepicker-clock-icon',
    fa: 'fa fa-clock-o',
    mat: 'access_time',
  },
];

export default ICON_MAPPING;
