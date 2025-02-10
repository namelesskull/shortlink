var _a, _b;
import { jsx, jsxs, Fragment as Fragment$1 } from "react/jsx-runtime";
import { useSearchParams, useNavigate, Link, Outlet, useParams, useRoutes, Navigate } from "react-router-dom";
import { ax as useMediaQuery, aK as getFromLocalStorage, s as setInLocalStorage, aL as Underlay, c as createSvgIcon, aI as Navbar, I as IconButton, a7 as getBootstrapData, aM as useUserTimezone, m as message, P as getInputFieldClassNames, am as useField, an as Field, a8 as useIsMobileMediaQuery, aN as useSelectedLocale, aO as useDateFormatter, W as KeyboardArrowLeftIcon, u as useSettings, aj as DateFormatPresets, aP as shallowEqual, A as List, G as ListItem, T as Trans, aQ as useAutoFocus, e as useDialogContext, i as DialogFooter, B as Button, D as Dialog, g as DialogBody, v as DialogTrigger, a as apiClient, U as createEventHandler, aR as useIsDarkMode, S as Skeleton, aS as Checkbox, d as useTrans, Q as useNumberFormatter, a9 as SelectForwardRef, N as Item, aT as hasNextPage, aU as ArrowDropDownIcon, M as FormSelect, aV as AvatarPlaceholderIcon, r as Tooltip, J as opacityAnimation, h as FormTextField, k as Chip, aW as useListbox, aX as Listbox, aY as Popover, $ as ProgressCircle, aZ as KeyboardArrowDownIcon, a_ as useListboxKeyboardNavigation, f as DialogHeader, F as Form, H as TextField, av as SearchIcon, aA as FormattedNumber, n as CloseIcon, aa as ProgressBar, Y as StaticPageTitle, q as queryClient, t as toast, j as showHttpErrorToast, w as ConfirmationDialog, a$ as errorStatusIs, a0 as IllustratedMessage, a1 as SvgImage, V as ButtonBase, b0 as UploadedFile, R as clamp, b1 as WorkspaceQueryKeys, o as onFormQueryError, b2 as useActiveWorkspaceId, b3 as useAuth, b4 as PersonalWorkspace, y as useValueLists, b5 as ExitToAppIcon, ad as MenuTrigger, ae as Menu, a5 as LinkStyle, b6 as UnfoldMoreIcon, b7 as useUserWorkspaces, b8 as useActiveWorkspace, as as openDialog, l as CheckIcon, b9 as ProgressBarBase, p as FormattedDate, C as CustomMenu, ba as AdHost, aJ as Footer$1, bb as useThemeSelector, af as RemoteFavicon, ag as removeProtocol, bc as lazyLoader, bd as prefetchValueLists, be as LockIcon, Z as FileUploadProvider, x as FormImageSelector, bf as SettingsIcon, ab as LinkIcon, bg as urlIsValid, bh as removeEmptyValuesFromObject, bi as useRecaptcha, bj as LinkClipboardButton, bk as ShareLinkButton, bl as shareLink, a2 as useNavigate$1, bm as WarningIcon, a6 as SiteConfigContext, bn as FloatingLinkOverlay, a4 as FullPageLoader, bo as ImageIcon, bp as SocialsList, bq as parse, br as WidgetRenderers, bs as BiolinkLayout, bt as RadioGroup, bu as Radio, bv as cssPropsFromBgConfig, bw as useCollator, bx as loadFonts, by as notifySvg, bz as useActiveUpload, au as UploadInputType, bA as Disk, bB as UnfoldLessIcon, aC as PageMetaTags, aD as PageStatus, aG as AuthRoute, aH as NotFoundPage } from "../server-entry.mjs";
import React, { createContext, useEffect, useMemo, useCallback, cloneElement, useContext, useState, useRef, Fragment, memo, useId, isValidElement, forwardRef, Children, useLayoutEffect as useLayoutEffect$1, Suspense, lazy, createElement } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useControlledState } from "@react-stately/utils";
import clsx from "clsx";
import { useController, useFormContext, useForm, useFieldArray, FormProvider } from "react-hook-form";
import { useQuery, keepPreviousData, useMutation, useQueryClient } from "@tanstack/react-query";
import { FocusScope, createFocusManager, useFocusManager, getFocusableTreeWalker } from "@react-aria/focus";
import { useObjectRef, mergeProps, isMac, focusWithoutScrolling, useGlobalListeners, useLayoutEffect, getScrollParent } from "@react-aria/utils";
import { E as EditIcon, S as SectionHelper, M as MoreHorizIcon, B as Breadcrumb, a as BreadcrumbItem } from "./Edit-432e54b5.mjs";
import { getLocalTimeZone, now, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, CalendarDate, toZoned, maxDate, minDate, isSameDay, toCalendarDate, isSameMonth, today, getMinimumDayInMonth, getMinimumMonthInYear, getDayOfWeek, isToday, getWeeksInMonth, parseAbsolute, parseAbsoluteToLocal, DateFormatter } from "@internationalized/date";
import { NumberParser } from "@internationalized/number";
import memoize from "nano-memoize";
import { parseColor } from "@react-stately/color";
import { useInteractOutside } from "@react-aria/interactions";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import getVideoId from "get-video-id";
const DashboardLayoutContext = createContext(
  null
);
function useBlockBodyOverflow(disable = false) {
  useEffect(() => {
    if (disable) {
      document.documentElement.classList.remove("no-page-overflow");
    } else {
      document.documentElement.classList.add("no-page-overflow");
    }
    return () => {
      document.documentElement.classList.remove("no-page-overflow");
    };
  }, [disable]);
}
function DashboardLayout({
  children,
  leftSidenavStatus: leftSidenav,
  onLeftSidenavChange,
  rightSidenavStatus: rightSidenav,
  initialRightSidenavStatus,
  onRightSidenavChange,
  name,
  leftSidenavCanBeCompact,
  height = "h-screen",
  className,
  gridClassName = "dashboard-grid",
  blockBodyOverflow = true,
  ...domProps
}) {
  useBlockBodyOverflow(!blockBodyOverflow);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isCompactModeInitially = useMemo(() => {
    return !name ? false : getFromLocalStorage(`${name}.sidenav.compact`);
  }, [name]);
  const defaultLeftSidenavStatus = isCompactModeInitially ? "compact" : "open";
  const [leftSidenavStatus, setLeftSidenavStatus] = useControlledState(
    leftSidenav,
    isMobile ? "closed" : defaultLeftSidenavStatus,
    onLeftSidenavChange
  );
  const rightSidenavStatusDefault = useMemo(() => {
    if (isMobile) {
      return "closed";
    }
    if (initialRightSidenavStatus != null) {
      return initialRightSidenavStatus;
    }
    const userSelected = getFromLocalStorage(
      `${name}.sidenav.right.position`,
      "open"
    );
    if (userSelected != null) {
      return userSelected;
    }
    return initialRightSidenavStatus || "closed";
  }, [isMobile, name, initialRightSidenavStatus]);
  const [rightSidenavStatus, _setRightSidenavStatus] = useControlledState(
    rightSidenav,
    rightSidenavStatusDefault,
    onRightSidenavChange
  );
  const setRightSidenavStatus = useCallback(
    (status) => {
      _setRightSidenavStatus(status);
      setInLocalStorage(`${name}.sidenav.right.position`, status);
    },
    [_setRightSidenavStatus, name]
  );
  const shouldShowUnderlay = isMobile && (leftSidenavStatus === "open" || rightSidenavStatus === "open");
  return /* @__PURE__ */ jsx(
    DashboardLayoutContext.Provider,
    {
      value: {
        leftSidenavStatus,
        setLeftSidenavStatus,
        rightSidenavStatus,
        setRightSidenavStatus,
        leftSidenavCanBeCompact,
        name,
        isMobileMode: isMobile
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ...domProps,
          className: clsx("relative isolate", gridClassName, className, height),
          children: [
            children,
            /* @__PURE__ */ jsx(AnimatePresence, { children: shouldShowUnderlay && /* @__PURE__ */ jsx(
              Underlay,
              {
                position: "fixed",
                onClick: () => {
                  setLeftSidenavStatus("closed");
                  setRightSidenavStatus("closed");
                }
              },
              "dashboard-underlay"
            ) })
          ]
        }
      )
    }
  );
}
function DashboardContent({
  children,
  isScrollable = true
}) {
  return cloneElement(children, {
    className: clsx(
      children.props.className,
      isScrollable && "overflow-y-auto stable-scrollbar",
      "dashboard-grid-content"
    )
  });
}
function DashboardSidenav({
  className,
  position: position2,
  children,
  size: size2 = "md",
  mode,
  overlayPosition = "fixed",
  display = "flex",
  overflow = "overflow-hidden",
  forceClosed = false
}) {
  const {
    isMobileMode,
    leftSidenavStatus,
    setLeftSidenavStatus,
    rightSidenavStatus,
    setRightSidenavStatus
  } = useContext(DashboardLayoutContext);
  const status = position2 === "left" ? leftSidenavStatus : rightSidenavStatus;
  const isOverlayMode = isMobileMode || mode === "overlay";
  const variants = {
    open: { display, width: null },
    compact: {
      display,
      width: null
    },
    closed: {
      width: 0,
      transitionEnd: {
        display: "none"
      }
    }
  };
  const sizeClassName = getSize(status === "compact" ? "compact" : size2);
  return /* @__PURE__ */ jsx(
    m.div,
    {
      variants,
      initial: false,
      animate: forceClosed ? "closed" : status,
      transition: { type: "tween", duration: 0.15 },
      onClick: (e) => {
        const target = e.target;
        if (isMobileMode && (target.closest("button") || target.closest("a"))) {
          setLeftSidenavStatus("closed");
          setRightSidenavStatus("closed");
        }
      },
      className: clsx(
        className,
        position2 === "left" ? "dashboard-grid-sidenav-left" : "dashboard-grid-sidenav-right",
        "will-change-[width]",
        overflow,
        sizeClassName,
        isOverlayMode && `${overlayPosition} bottom-0 top-0 z-20 shadow-2xl`,
        isOverlayMode && position2 === "left" && "left-0",
        isOverlayMode && position2 === "right" && "right-0"
      ),
      children: cloneElement(children, {
        className: clsx(
          children.props.className,
          "w-full h-full",
          status === "compact" && "compact-scrollbar"
        ),
        isCompactMode: status === "compact"
      })
    }
  );
}
function getSize(size2) {
  switch (size2) {
    case "compact":
      return "w-80";
    case "sm":
      return "w-224";
    case "md":
      return "w-240";
    case "lg":
      return "w-288";
    default:
      return size2 || "";
  }
}
const MenuOpenIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z" }),
  "MenuOpenOutlined"
);
function DashboardNavbar({
  children,
  className,
  hideToggleButton,
  ...props
}) {
  const {
    isMobileMode,
    leftSidenavStatus,
    setLeftSidenavStatus,
    name,
    leftSidenavCanBeCompact
  } = useContext(DashboardLayoutContext);
  const shouldToggleCompactMode = leftSidenavCanBeCompact && !isMobileMode;
  const shouldShowToggle = !hideToggleButton && (isMobileMode || leftSidenavCanBeCompact);
  const handleToggle = () => {
    setLeftSidenavStatus(leftSidenavStatus === "open" ? "closed" : "open");
  };
  const handleCompactModeToggle = () => {
    const newStatus = leftSidenavStatus === "compact" ? "open" : "compact";
    setInLocalStorage(`${name}.sidenav.compact`, newStatus === "compact");
    setLeftSidenavStatus(newStatus);
  };
  return /* @__PURE__ */ jsx(
    Navbar,
    {
      className: clsx("dashboard-grid-navbar", className),
      border: "border-b",
      size: "sm",
      toggleButton: shouldShowToggle ? /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "md",
          onClick: () => {
            if (shouldToggleCompactMode) {
              handleCompactModeToggle();
            } else {
              handleToggle();
            }
          },
          children: /* @__PURE__ */ jsx(MenuOpenIcon, {})
        }
      ) : void 0,
      ...props,
      children
    }
  );
}
var FilterControlType = /* @__PURE__ */ ((FilterControlType2) => {
  FilterControlType2["Select"] = "select";
  FilterControlType2["DateRangePicker"] = "dateRangePicker";
  FilterControlType2["SelectModel"] = "selectModel";
  FilterControlType2["Input"] = "input";
  FilterControlType2["BooleanToggle"] = "booleanToggle";
  FilterControlType2["ChipField"] = "chipField";
  FilterControlType2["Custom"] = "custom";
  return FilterControlType2;
})(FilterControlType || {});
var FilterOperator = /* @__PURE__ */ ((FilterOperator2) => {
  FilterOperator2["eq"] = "=";
  FilterOperator2["ne"] = "!=";
  FilterOperator2["gt"] = ">";
  FilterOperator2["gte"] = ">=";
  FilterOperator2["lt"] = "<";
  FilterOperator2["lte"] = "<=";
  FilterOperator2["has"] = "has";
  FilterOperator2["hasAll"] = "hasAll";
  FilterOperator2["doesntHave"] = "doesntHave";
  FilterOperator2["between"] = "between";
  return FilterOperator2;
})(FilterOperator || {});
const ALL_PRIMITIVE_OPERATORS = [
  "=",
  "!=",
  ">",
  ">=",
  "<",
  "<="
  /* lte */
];
function startOfDay(date) {
  return date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
}
function endOfDay(date) {
  return date.set({
    hour: 24 - 1,
    minute: 60 - 1,
    second: 60 - 1,
    millisecond: 1e3 - 1
  });
}
function getUserTimezone() {
  var _a2, _b2, _c;
  const defaultTimezone = (_a2 = getBootstrapData()) == null ? void 0 : _a2.settings.dates.default_timezone;
  const preferredTimezone = ((_c = (_b2 = getBootstrapData()) == null ? void 0 : _b2.user) == null ? void 0 : _c.timezone) || defaultTimezone || "auto";
  if (!preferredTimezone || preferredTimezone === "auto") {
    return getLocalTimeZone();
  }
  return preferredTimezone;
}
function useCurrentDateTime() {
  const timezone = useUserTimezone();
  return useMemo(() => {
    try {
      return now(timezone);
    } catch (e) {
      return now("UTC");
    }
  }, [timezone]);
}
function getCurrentDateTime() {
  const timezone = getUserTimezone();
  try {
    return now(timezone);
  } catch (e) {
    return now("UTC");
  }
}
const Now = startOfDay(getCurrentDateTime());
const locale = ((_b = (_a = getBootstrapData()) == null ? void 0 : _a.i18n) == null ? void 0 : _b.language) || "en";
const DateRangePresets = [
  {
    key: 0,
    label: message("Today"),
    getRangeValue: () => ({
      preset: 0,
      start: Now,
      end: endOfDay(Now)
    })
  },
  {
    key: 1,
    label: message("Yesterday"),
    getRangeValue: () => ({
      preset: 1,
      start: Now.subtract({ days: 1 }),
      end: endOfDay(Now).subtract({ days: 1 })
    })
  },
  {
    key: 2,
    label: message("This week"),
    getRangeValue: () => ({
      preset: 2,
      start: startOfWeek(Now, locale),
      end: endOfWeek(endOfDay(Now), locale)
    })
  },
  {
    key: 3,
    label: message("Last week"),
    getRangeValue: () => {
      const start = startOfWeek(Now, locale).subtract({ days: 7 });
      return {
        preset: 3,
        start,
        end: start.add({ days: 6 })
      };
    }
  },
  {
    key: 4,
    label: message("Last 7 days"),
    getRangeValue: () => ({
      preset: 4,
      start: Now.subtract({ days: 7 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 6,
    label: message("Last 30 days"),
    getRangeValue: () => ({
      preset: 6,
      start: Now.subtract({ days: 30 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 7,
    label: message("Last 3 months"),
    getRangeValue: () => ({
      preset: 7,
      start: Now.subtract({ months: 3 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 8,
    label: message("Last 12 months"),
    getRangeValue: () => ({
      preset: 8,
      start: Now.subtract({ months: 12 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 9,
    label: message("This month"),
    getRangeValue: () => ({
      preset: 9,
      start: startOfMonth(Now),
      end: endOfMonth(endOfDay(Now))
    })
  },
  {
    key: 10,
    label: message("This year"),
    getRangeValue: () => ({
      preset: 10,
      start: startOfYear(Now),
      end: endOfYear(endOfDay(Now))
    })
  },
  {
    key: 11,
    label: message("Last year"),
    getRangeValue: () => ({
      preset: 11,
      start: startOfYear(Now).subtract({ years: 1 }),
      end: endOfYear(endOfDay(Now)).subtract({ years: 1 })
    })
  }
];
const DateRangeIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z" }),
  "DateRangeOutlined"
);
const Input = React.forwardRef(
  (props, ref) => {
    const {
      children,
      inputProps,
      wrapperProps,
      className,
      autoFocus,
      style,
      onClick
    } = props;
    return /* @__PURE__ */ jsx("div", { ...wrapperProps, onClick, children: /* @__PURE__ */ jsx(
      "div",
      {
        ...inputProps,
        role: "group",
        className: clsx(
          className,
          "flex items-center focus-within:ring focus-within:ring-primary/focus focus-within:border-primary/60"
        ),
        ref,
        style,
        children: /* @__PURE__ */ jsx(FocusScope, { autoFocus, children })
      }
    ) });
  }
);
const DatePickerField = React.forwardRef(({ inputRef, wrapperProps, children, onBlur, ...other }, ref) => {
  const fieldClassNames = getInputFieldClassNames(other);
  const objRef = useObjectRef(ref);
  const { fieldProps, inputProps } = useField({
    ...other,
    focusRef: objRef,
    labelElementType: "span"
  });
  fieldClassNames.wrapper = clsx(
    fieldClassNames.wrapper,
    other.disabled && "pointer-events-none"
  );
  return /* @__PURE__ */ jsx(
    Field,
    {
      wrapperProps: mergeProps(
        wrapperProps,
        {
          onBlur: (e) => {
            var _a2;
            if (!((_a2 = objRef.current) == null ? void 0 : _a2.contains(e.relatedTarget))) {
              onBlur == null ? void 0 : onBlur(e);
            }
          },
          onClick: () => {
            const focusManager = createFocusManager(objRef);
            focusManager == null ? void 0 : focusManager.focusFirst();
          }
        }
      ),
      fieldClassNames,
      ref: objRef,
      ...fieldProps,
      children: /* @__PURE__ */ jsx(
        Input,
        {
          inputProps,
          className: clsx(fieldClassNames.input, "gap-10"),
          ref: inputRef,
          children
        }
      )
    }
  );
});
function getDefaultGranularity(date) {
  if (date instanceof CalendarDate) {
    return "day";
  }
  return "minute";
}
function dateIsInvalid(date, min, max) {
  return min != null && date.compare(min) < 0 || max != null && date.compare(max) > 0;
}
function toSafeZoned(date, timeZone, disambiguation) {
  try {
    return toZoned(date, timeZone, disambiguation);
  } catch (e) {
    return toZoned(date, "UTC", disambiguation);
  }
}
function useBaseDatePickerState(selectedDate, props) {
  const timezone = useUserTimezone();
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const closeDialogOnSelection = props.closeDialogOnSelection ?? true;
  const granularity = props.granularity || getDefaultGranularity(selectedDate);
  const min = props.min ? toSafeZoned(props.min, timezone) : void 0;
  const max = props.max ? toSafeZoned(props.max, timezone) : void 0;
  return {
    timezone,
    granularity,
    min,
    max,
    calendarIsOpen,
    setCalendarIsOpen,
    closeDialogOnSelection
  };
}
function useDateRangePickerState(props) {
  var _a2, _b2;
  const now2 = useCurrentDateTime();
  const [isPlaceholder, setIsPlaceholder] = useState({
    start: (!props.value || !props.value.start) && !((_a2 = props.defaultValue) == null ? void 0 : _a2.start),
    end: (!props.value || !props.value.end) && !((_b2 = props.defaultValue) == null ? void 0 : _b2.end)
  });
  const setStateValue = props.onChange;
  const [internalValue, setInternalValue] = useControlledState(
    props.value ? completeRange(props.value, now2) : void 0,
    !props.value ? completeRange(props.defaultValue, now2) : void 0,
    (value) => {
      setIsPlaceholder({ start: false, end: false });
      setStateValue == null ? void 0 : setStateValue(value);
    }
  );
  const {
    min,
    max,
    granularity,
    timezone,
    calendarIsOpen,
    setCalendarIsOpen,
    closeDialogOnSelection
  } = useBaseDatePickerState(internalValue.start, props);
  const clear = useCallback(() => {
    setIsPlaceholder({ start: true, end: true });
    setInternalValue(completeRange(null, now2));
    setStateValue == null ? void 0 : setStateValue(null);
    setCalendarIsOpen(false);
  }, [now2, setInternalValue, setStateValue, setCalendarIsOpen]);
  const [anchorDate, setAnchorDate] = useState(null);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [highlightedRange, setHighlightedRange] = useState(internalValue);
  const [calendarDates, setCalendarDates] = useState(() => {
    return rangeToCalendarDates(internalValue, max);
  });
  const constrainRange = useCallback(
    (range) => {
      let start = range.start;
      let end = range.end;
      if (min) {
        start = maxDate(start, min);
      }
      const startMax = max ? minDate(max, end) : end;
      start = minDate(start, startMax);
      const endMin = min ? maxDate(min, start) : start;
      end = maxDate(end, endMin);
      if (max) {
        end = minDate(end, max);
      }
      return {
        start: toSafeZoned(start, timezone),
        end: toSafeZoned(end, timezone)
      };
    },
    [min, max, timezone]
  );
  const setSelectedValue = useCallback(
    (newRange) => {
      const value = {
        ...constrainRange(newRange),
        preset: newRange.preset
      };
      setInternalValue(value);
      setHighlightedRange(value);
      setCalendarDates(rangeToCalendarDates(value, max));
      setIsPlaceholder({ start: false, end: false });
    },
    [setInternalValue, constrainRange, max]
  );
  const dayIsActive = useCallback(
    (day) => {
      return !isPlaceholder.start && isSameDay(day, highlightedRange.start) || !isPlaceholder.end && isSameDay(day, highlightedRange.end);
    },
    [highlightedRange, isPlaceholder]
  );
  const dayIsHighlighted = useCallback(
    (day) => {
      return (isHighlighting || !isPlaceholder.start && !isPlaceholder.end) && day.compare(highlightedRange.start) >= 0 && day.compare(highlightedRange.end) <= 0;
    },
    [highlightedRange, isPlaceholder, isHighlighting]
  );
  const dayIsRangeStart = useCallback(
    (day) => isSameDay(day, highlightedRange.start),
    [highlightedRange]
  );
  const dayIsRangeEnd = useCallback(
    (day) => isSameDay(day, highlightedRange.end),
    [highlightedRange]
  );
  const getCellProps = useCallback(
    (date, isSameMonth2) => {
      return {
        onPointerEnter: () => {
          if (isHighlighting && isSameMonth2) {
            setHighlightedRange(
              makeRange({ start: anchorDate, end: date, timezone })
            );
          }
        },
        onClick: () => {
          if (!isHighlighting) {
            setIsHighlighting(true);
            setAnchorDate(date);
            setHighlightedRange(makeRange({ start: date, end: date, timezone }));
          } else {
            const finalRange = makeRange({
              start: anchorDate,
              end: date,
              timezone
            });
            finalRange.start = startOfDay(finalRange.start);
            finalRange.end = endOfDay(finalRange.end);
            setIsHighlighting(false);
            setAnchorDate(null);
            setSelectedValue == null ? void 0 : setSelectedValue(finalRange);
            if (closeDialogOnSelection) {
              setCalendarIsOpen == null ? void 0 : setCalendarIsOpen(false);
            }
          }
        }
      };
    },
    [
      anchorDate,
      isHighlighting,
      setSelectedValue,
      setCalendarIsOpen,
      closeDialogOnSelection,
      timezone
    ]
  );
  return {
    selectedValue: internalValue,
    setSelectedValue,
    calendarIsOpen,
    setCalendarIsOpen,
    dayIsActive,
    dayIsHighlighted,
    dayIsRangeStart,
    dayIsRangeEnd,
    getCellProps,
    calendarDates,
    setIsPlaceholder,
    isPlaceholder,
    clear,
    setCalendarDates,
    min,
    max,
    granularity,
    timezone,
    closeDialogOnSelection
  };
}
function rangeToCalendarDates(range, max) {
  let start = toCalendarDate(startOfMonth(range.start));
  let end = toCalendarDate(endOfMonth(range.end));
  if (isSameMonth(start, end)) {
    end = endOfMonth(end.add({ months: 1 }));
  }
  if (max && end.compare(max) > 0) {
    end = start;
    start = startOfMonth(start.subtract({ months: 1 }));
  }
  return [start, end];
}
function makeRange(props) {
  const start = toSafeZoned(props.start, props.timezone);
  const end = toSafeZoned(props.end, props.timezone);
  if (start.compare(end) > 0) {
    return { start: end, end: start };
  }
  return { start, end };
}
function completeRange(range, now2) {
  if ((range == null ? void 0 : range.start) && (range == null ? void 0 : range.end)) {
    return range;
  } else if (!(range == null ? void 0 : range.start) && (range == null ? void 0 : range.end)) {
    range.start = range.end.subtract({ months: 1 });
    return range;
  } else if (!(range == null ? void 0 : range.end) && (range == null ? void 0 : range.start)) {
    range.end = range.start.add({ months: 1 });
    return range;
  }
  return { start: now2, end: now2.add({ months: 1 }) };
}
const ArrowRightAltIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" }),
  "ArrowRightAltOutlined"
);
function adjustSegment(value, part, amount, options) {
  switch (part) {
    case "era":
    case "year":
    case "month":
    case "day":
      return value.cycle(part, amount, { round: part === "year" });
  }
  if ("hour" in value) {
    switch (part) {
      case "dayPeriod": {
        const hours = value.hour;
        const isPM = hours >= 12;
        return value.set({ hour: isPM ? hours - 12 : hours + 12 });
      }
      case "hour":
      case "minute":
      case "second":
        return value.cycle(part, amount, {
          round: part !== "hour",
          hourCycle: options.hour12 ? 12 : 24
        });
    }
  }
  return value;
}
function setSegment(value, part, segmentValue, options) {
  switch (part) {
    case "day":
    case "month":
    case "year":
      return value.set({ [part]: segmentValue });
  }
  if ("hour" in value) {
    switch (part) {
      case "dayPeriod": {
        const hours = value.hour;
        const wasPM = hours >= 12;
        const isPM = segmentValue >= 12;
        if (isPM === wasPM) {
          return value;
        }
        return value.set({ hour: wasPM ? hours - 12 : hours + 12 });
      }
      case "hour":
        if (options.hour12) {
          const hours = value.hour;
          const wasPM = hours >= 12;
          if (!wasPM && segmentValue === 12) {
            segmentValue = 0;
          }
          if (wasPM && segmentValue < 12) {
            segmentValue += 12;
          }
        }
      case "minute":
      case "second":
        return value.set({ [part]: segmentValue });
    }
  }
  return value;
}
const PAGE_STEP = {
  year: 5,
  month: 2,
  day: 7,
  hour: 2,
  minute: 15,
  second: 15,
  dayPeriod: 1
};
function EditableDateSegment({
  segment,
  domProps,
  value,
  onChange,
  isPlaceholder,
  state: { timezone, calendarIsOpen, setCalendarIsOpen }
}) {
  const isMobile = useIsMobileMediaQuery();
  const enteredKeys = useRef("");
  const { localeCode } = useSelectedLocale();
  const focusManager = useFocusManager();
  const formatter = useDateFormatter({ timeZone: timezone });
  const parser = useMemo(
    () => new NumberParser(localeCode, { maximumFractionDigits: 0 }),
    [localeCode]
  );
  const setSegmentValue = (newValue) => {
    onChange(
      setSegment(value, segment.type, newValue, formatter.resolvedOptions())
    );
  };
  const adjustSegmentValue = (amount) => {
    onChange(
      adjustSegment(value, segment.type, amount, formatter.resolvedOptions())
    );
  };
  const backspace = () => {
    if (parser.isValidPartialNumber(segment.text)) {
      const newValue = segment.text.slice(0, -1);
      const parsed = parser.parse(newValue);
      if (newValue.length === 0 || parsed === 0) {
        const now2 = today(timezone);
        if (segment.type in now2) {
          setSegmentValue(now2[segment.type]);
        }
      } else {
        setSegmentValue(parsed);
      }
      enteredKeys.current = newValue;
    } else if (segment.type === "dayPeriod") {
      adjustSegmentValue(-1);
    }
  };
  const onKeyDown = (e) => {
    var _a2;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
      return;
    }
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        e.stopPropagation();
        focusManager == null ? void 0 : focusManager.focusPrevious();
        break;
      case "ArrowRight":
        e.preventDefault();
        e.stopPropagation();
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "Enter":
        (_a2 = e.target.closest("form")) == null ? void 0 : _a2.requestSubmit();
        setCalendarIsOpen(!calendarIsOpen);
        break;
      case "Tab":
        break;
      case "Backspace":
      case "Delete": {
        e.preventDefault();
        e.stopPropagation();
        backspace();
        break;
      }
      case "ArrowUp":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(1);
        break;
      case "ArrowDown":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(-1);
        break;
      case "PageUp":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(PAGE_STEP[segment.type] || 1);
        break;
      case "PageDown":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(-(PAGE_STEP[segment.type] || 1));
        break;
      case "Home":
        e.preventDefault();
        enteredKeys.current = "";
        setSegmentValue(segment.maxValue);
        break;
      case "End":
        e.preventDefault();
        enteredKeys.current = "";
        setSegmentValue(segment.minValue);
        break;
    }
    onInput(e.key);
  };
  const amPmFormatter = useDateFormatter({ hour: "numeric", hour12: true });
  const am = useMemo(() => {
    const amDate = /* @__PURE__ */ new Date();
    amDate.setHours(0);
    return amPmFormatter.formatToParts(amDate).find((part) => part.type === "dayPeriod").value;
  }, [amPmFormatter]);
  const pm = useMemo(() => {
    const pmDate = /* @__PURE__ */ new Date();
    pmDate.setHours(12);
    return amPmFormatter.formatToParts(pmDate).find((part) => part.type === "dayPeriod").value;
  }, [amPmFormatter]);
  const onInput = (key) => {
    const newValue = enteredKeys.current + key;
    switch (segment.type) {
      case "dayPeriod":
        if (am.toLowerCase().startsWith(key)) {
          setSegmentValue(0);
        } else if (pm.toLowerCase().startsWith(key)) {
          setSegmentValue(12);
        } else {
          break;
        }
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "day":
      case "hour":
      case "minute":
      case "second":
      case "month":
      case "year": {
        if (!parser.isValidPartialNumber(newValue)) {
          return;
        }
        let numberValue = parser.parse(newValue);
        let segmentValue = numberValue;
        let allowsZero = segment.minValue === 0;
        if (segment.type === "hour" && formatter.resolvedOptions().hour12) {
          switch (formatter.resolvedOptions().hourCycle) {
            case "h11":
              if (numberValue > 11) {
                segmentValue = parser.parse(key);
              }
              break;
            case "h12":
              allowsZero = false;
              if (numberValue > 12) {
                segmentValue = parser.parse(key);
              }
              break;
          }
          if (segment.value >= 12 && numberValue > 1) {
            numberValue += 12;
          }
        } else if (numberValue > segment.maxValue) {
          segmentValue = parser.parse(key);
        }
        if (Number.isNaN(numberValue)) {
          return;
        }
        const shouldSetValue = segmentValue !== 0 || allowsZero;
        if (shouldSetValue) {
          setSegmentValue(segmentValue);
        }
        if (Number(`${numberValue}0`) > segment.maxValue || newValue.length >= String(segment.maxValue).length) {
          enteredKeys.current = "";
          if (shouldSetValue) {
            focusManager == null ? void 0 : focusManager.focusNext();
          }
        } else {
          enteredKeys.current = newValue;
        }
        break;
      }
    }
  };
  const spinButtonProps = isMobile ? {} : {
    "aria-label": segment.type,
    "aria-valuetext": isPlaceholder ? void 0 : `${segment.value}`,
    "aria-valuemin": segment.minValue,
    "aria-valuemax": segment.maxValue,
    "aria-valuenow": isPlaceholder ? void 0 : segment.value,
    tabIndex: 0,
    onKeyDown
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...mergeProps(domProps, {
        ...spinButtonProps,
        onFocus: (e) => {
          enteredKeys.current = "";
          e.target.scrollIntoView({ block: "nearest" });
        },
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
        }
      }),
      className: "box-content cursor-default select-none whitespace-nowrap rounded p-2 text-center tabular-nums caret-transparent outline-none focus:bg-primary focus:text-on-primary",
      children: segment.text.padStart(segment.minLength, "0")
    }
  );
}
function LiteralDateSegment({ segment, domProps }) {
  const focusManager = useFocusManager();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...domProps,
      onPointerDown: (e) => {
        if (e.pointerType === "mouse") {
          e.preventDefault();
          const res = focusManager == null ? void 0 : focusManager.focusNext({ from: e.target });
          if (!res) {
            focusManager == null ? void 0 : focusManager.focusPrevious({ from: e.target });
          }
        }
      },
      "aria-hidden": true,
      className: "min-w-4 cursor-default select-none",
      children: segment.text
    }
  );
}
function getSegmentLimits(date, type, options) {
  switch (type) {
    case "year":
      return {
        value: date.year,
        placeholder: "yyyy",
        minValue: 1,
        maxValue: date.calendar.getYearsInEra(date)
      };
    case "month":
      return {
        value: date.month,
        placeholder: "mm",
        minValue: getMinimumMonthInYear(date),
        maxValue: date.calendar.getMonthsInYear(date)
      };
    case "day":
      return {
        value: date.day,
        minValue: getMinimumDayInMonth(date),
        maxValue: date.calendar.getDaysInMonth(date),
        placeholder: "dd"
      };
  }
  if ("hour" in date) {
    switch (type) {
      case "dayPeriod":
        return {
          value: date.hour >= 12 ? 12 : 0,
          minValue: 0,
          maxValue: 12,
          placeholder: "--"
        };
      case "hour":
        if (options.hour12) {
          const isPM = date.hour >= 12;
          return {
            value: date.hour,
            minValue: isPM ? 12 : 0,
            maxValue: isPM ? 23 : 11,
            placeholder: "--"
          };
        }
        return {
          value: date.hour,
          minValue: 0,
          maxValue: 23,
          placeholder: "--"
        };
      case "minute":
        return {
          value: date.minute,
          minValue: 0,
          maxValue: 59,
          placeholder: "--"
        };
    }
  }
  return {};
}
function DateSegmentList({
  segmentProps,
  state,
  value,
  onChange,
  isPlaceholder
}) {
  const { granularity } = state;
  const options = useMemo(() => {
    const memoOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    };
    if (granularity === "minute") {
      memoOptions.hour = "numeric";
      memoOptions.minute = "numeric";
    }
    return memoOptions;
  }, [granularity]);
  const formatter = useDateFormatter(options);
  const dateValue = useMemo(() => value.toDate(), [value]);
  const segments = useMemo(() => {
    return formatter.formatToParts(dateValue).map((segment) => {
      const limits = getSegmentLimits(
        value,
        segment.type,
        formatter.resolvedOptions()
      );
      const textValue = isPlaceholder && segment.type !== "literal" ? limits.placeholder : segment.value;
      return {
        type: segment.type,
        text: segment.value === ", " ? " " : textValue,
        ...limits,
        minLength: segment.type !== "literal" ? String(limits.maxValue).length : 1
      };
    });
  }, [dateValue, formatter, isPlaceholder, value]);
  return /* @__PURE__ */ jsx("div", { className: "flex items-center", children: segments.map((segment, index) => {
    if (segment.type === "literal") {
      return /* @__PURE__ */ jsx(
        LiteralDateSegment,
        {
          domProps: segmentProps,
          segment
        },
        index
      );
    }
    return /* @__PURE__ */ jsx(
      EditableDateSegment,
      {
        isPlaceholder,
        domProps: segmentProps,
        state,
        value,
        onChange,
        segment
      },
      index
    );
  }) });
}
const KeyboardArrowRightIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" }),
  "KeyboardArrowRightOutlined"
);
function CalendarCell({
  date,
  currentMonth,
  state: {
    dayIsActive,
    dayIsHighlighted,
    dayIsRangeStart,
    dayIsRangeEnd,
    getCellProps,
    timezone,
    min,
    max
  }
}) {
  const { localeCode } = useSelectedLocale();
  const dayOfWeek = getDayOfWeek(date, localeCode);
  const isActive = dayIsActive(date);
  const isHighlighted = dayIsHighlighted(date);
  const isRangeStart = dayIsRangeStart(date);
  const isRangeEnd = dayIsRangeEnd(date);
  const dayIsToday = isToday(date, timezone);
  const sameMonth = isSameMonth(date, currentMonth);
  const isDisabled = dateIsInvalid(date, min, max);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "button",
      "aria-disabled": isDisabled,
      className: clsx(
        "w-40 h-40 text-sm relative isolate flex-shrink-0",
        isDisabled && "text-disabled pointer-events-none",
        !sameMonth && "invisible pointer-events-none"
      ),
      ...getCellProps(date, sameMonth),
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "absolute inset-0 flex items-center justify-center rounded-full w-full h-full select-none z-10 cursor-pointer",
              !isActive && !dayIsToday && "hover:bg-hover",
              isActive && "bg-primary text-on-primary font-semibold",
              dayIsToday && !isActive && "bg-chip"
            ),
            children: date.day
          }
        ),
        isHighlighted && sameMonth && /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "absolute w-full h-full inset-0 bg-primary/focus",
              (isRangeStart || dayOfWeek === 0 || date.day === 1) && "rounded-l-full",
              (isRangeEnd || dayOfWeek === 6 || date.day === currentMonth.calendar.getDaysInMonth(currentMonth)) && "rounded-r-full"
            )
          }
        )
      ]
    }
  );
}
function CalendarMonth({
  startDate,
  state,
  isFirst,
  isLast
}) {
  const { localeCode } = useSelectedLocale();
  const weeksInMonth = getWeeksInMonth(startDate, localeCode);
  const monthStart = startOfWeek(startDate, localeCode);
  return /* @__PURE__ */ jsxs("div", { className: "w-280 flex-shrink-0", children: [
    /* @__PURE__ */ jsx(
      CalendarMonthHeader,
      {
        isFirst,
        isLast,
        state,
        currentMonth: startDate
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "block", role: "grid", children: [
      /* @__PURE__ */ jsx(WeekdayHeader, { state, startDate }),
      [...new Array(weeksInMonth).keys()].map((weekIndex) => /* @__PURE__ */ jsx(m.div, { className: "flex mb-6", children: [...new Array(7).keys()].map((dayIndex) => /* @__PURE__ */ jsx(
        CalendarCell,
        {
          date: monthStart.add({ weeks: weekIndex, days: dayIndex }),
          currentMonth: startDate,
          state
        },
        dayIndex
      )) }, weekIndex))
    ] })
  ] });
}
function CalendarMonthHeader({
  currentMonth,
  isFirst,
  isLast,
  state: { calendarDates, setCalendarDates, timezone, min, max }
}) {
  const shiftCalendars = (direction) => {
    const count = calendarDates.length;
    let newDates;
    if (direction === "forward") {
      newDates = calendarDates.map(
        (date) => endOfMonth(date.add({ months: count }))
      );
    } else {
      newDates = calendarDates.map(
        (date) => endOfMonth(date.subtract({ months: count }))
      );
    }
    setCalendarDates(newDates);
  };
  const monthFormatter = useDateFormatter({
    month: "long",
    year: "numeric",
    era: currentMonth.calendar.identifier !== "gregory" ? "long" : void 0,
    calendar: currentMonth.calendar.identifier
  });
  const isBackwardDisabled = dateIsInvalid(
    currentMonth.subtract({ days: 1 }),
    min,
    max
  );
  const isForwardDisabled = dateIsInvalid(
    startOfMonth(currentMonth.add({ months: 1 })),
    min,
    max
  );
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-10", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        className: clsx("text-muted", !isFirst && "invisible"),
        disabled: !isFirst || isBackwardDisabled,
        "aria-hidden": !isFirst,
        onClick: () => {
          shiftCalendars("backward");
        },
        children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold select-none", children: monthFormatter.format(currentMonth.toDate(timezone)) }),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        className: clsx("text-muted", !isLast && "invisible"),
        disabled: !isLast || isForwardDisabled,
        "aria-hidden": !isLast,
        onClick: () => {
          shiftCalendars("forward");
        },
        children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
      }
    )
  ] });
}
function WeekdayHeader({ state: { timezone }, startDate }) {
  const { localeCode } = useSelectedLocale();
  const dayFormatter = useDateFormatter({ weekday: "short" });
  const monthStart = startOfWeek(startDate, localeCode);
  return /* @__PURE__ */ jsx("div", { className: "flex", children: [...new Array(7).keys()].map((index) => {
    const date = monthStart.add({ days: index });
    const dateDay = date.toDate(timezone);
    const weekday = dayFormatter.format(dateDay);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-40 h-40 text-sm font-semibold relative flex-shrink-0",
        children: /* @__PURE__ */ jsx("div", { className: "absolute flex items-center justify-center w-full h-full select-none", children: weekday })
      },
      index
    );
  }) });
}
function Calendar({ state, visibleMonths = 1 }) {
  const isMobile = useIsMobileMediaQuery();
  if (isMobile) {
    visibleMonths = 1;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: [...new Array(visibleMonths).keys()].map((index) => {
    const startDate = toCalendarDate(
      startOfMonth(state.calendarDates[index])
    );
    const isFirst = index === 0;
    const isLast = index === visibleMonths - 1;
    return /* @__PURE__ */ jsx(
      CalendarMonth,
      {
        state,
        startDate,
        isFirst,
        isLast
      },
      index
    );
  }) });
}
const FormattedDateTimeRange = memo(
  ({ start, end, options, preset }) => {
    const { dates } = useSettings();
    const timezone = useUserTimezone();
    const formatter = useDateFormatter(
      options || DateFormatPresets[preset || (dates == null ? void 0 : dates.format)]
    );
    if (!start || !end) {
      return null;
    }
    let value;
    try {
      value = formatter.formatRange(
        castToDate(start, timezone),
        castToDate(end, timezone)
      );
    } catch (e) {
      value = "";
    }
    return /* @__PURE__ */ jsx(Fragment, { children: value });
  },
  shallowEqual
);
function castToDate(date, timezone) {
  if (typeof date === "string") {
    return parseAbsolute(date, timezone).toDate();
  }
  if ("toDate" in date) {
    return date.toDate(timezone);
  }
  return date;
}
function DatePresetList({
  onPresetSelected,
  selectedValue
}) {
  return /* @__PURE__ */ jsx(List, { children: DateRangePresets.map((preset) => /* @__PURE__ */ jsx(
    ListItem,
    {
      borderRadius: "rounded-none",
      capitalizeFirst: true,
      isSelected: (selectedValue == null ? void 0 : selectedValue.preset) === preset.key,
      onSelected: () => {
        const newValue = preset.getRangeValue();
        onPresetSelected(newValue);
      },
      children: /* @__PURE__ */ jsx(Trans, { ...preset.label })
    },
    preset.key
  )) });
}
function useIsTabletMediaQuery(options) {
  return useMediaQuery("(max-width: 1024px)", options);
}
const Switch = React.forwardRef(
  (props, ref) => {
    const {
      children,
      size: size2 = "sm",
      description,
      className,
      invalid,
      autoFocus,
      errorMessage,
      iconRight,
      ...domProps
    } = props;
    const inputRef = useObjectRef(ref);
    useAutoFocus({ autoFocus }, inputRef);
    const style = getSizeClassName$1(size2);
    const fieldClassNames = getInputFieldClassNames(props);
    const descriptionId = useId();
    return /* @__PURE__ */ jsxs("div", { className: clsx(className, "isolate"), children: [
      /* @__PURE__ */ jsxs("label", { className: "flex select-none items-center", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...domProps,
            type: "checkbox",
            role: "switch",
            "aria-invalid": invalid || void 0,
            "aria-describedby": description ? descriptionId : void 0,
            ref: inputRef,
            "aria-checked": domProps.checked,
            className: clsx(
              style,
              !invalid && "checked:border-primary checked:bg-primary dark:checked:border-primary-dark dark:checked:bg-primary-dark",
              invalid && "checked:border-danger checked:bg-danger",
              "relative flex flex-shrink-0 cursor-pointer appearance-none items-center overflow-hidden rounded-3xl border border-chip bg-chip p-0 outline-none transition-colors checked:border-primary checked:bg-primary",
              "before:z-10 before:block before:translate-x-2 before:rounded-3xl before:border before:bg-white before:transition-transform",
              "checked:before:border-white",
              "focus-visible:ring",
              props.disabled && "cursor-not-allowed opacity-80"
            )
          }
        ),
        children && /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              fieldClassNames.size.font,
              "ml-12",
              invalid && "text-danger",
              props.disabled && "text-disabled"
            ),
            children
          }
        ),
        iconRight
      ] }),
      description && !errorMessage && /* @__PURE__ */ jsx("div", { id: descriptionId, className: fieldClassNames.description, children: description }),
      errorMessage && /* @__PURE__ */ jsx("div", { id: descriptionId, className: fieldClassNames.error, children: errorMessage })
    ] });
  }
);
function FormSwitch(props) {
  const {
    field: { onChange, onBlur, value = false, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange: (e) => {
      if (e.target.value && e.target.value !== "on") {
        onChange(e.target.checked ? e.target.value : false);
      } else {
        onChange(e);
      }
    },
    onBlur,
    checked: !!value,
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    name: props.name
  };
  return /* @__PURE__ */ jsx(Switch, { ref, ...mergeProps(props, formProps) });
}
function getSizeClassName$1(size2) {
  switch (size2) {
    case "xl":
      return "w-68 h-36 before:w-28 before:h-28 checked:before:translate-x-36";
    case "lg":
      return "w-56 h-30 before:w-22 before:h-22 checked:before:translate-x-30";
    case "md":
      return "w-46 h-24 before:w-18 before:h-18 checked:before:translate-x-24";
    case "xs":
      return "w-30 h-18 before:w-12 before:h-12 checked:before:translate-x-14";
    default:
      return "w-38 h-20 before:w-14 before:h-14 checked:before:translate-x-20";
  }
}
const DateRangeComparePresets = [
  {
    key: 0,
    label: message("Preceding period"),
    getRangeValue: (range) => {
      const startDate = range.start;
      const endDate = range.end;
      const diffInMilliseconds = endDate.toDate().getTime() - startDate.toDate().getTime();
      const diffInMinutes = diffInMilliseconds / (1e3 * 60);
      const newStart = startDate.subtract({ minutes: diffInMinutes });
      return {
        preset: 0,
        start: newStart,
        end: startDate
      };
    }
  },
  {
    key: 1,
    label: message("Same period last year"),
    getRangeValue: (range) => {
      return {
        start: range.start.subtract({ years: 1 }),
        end: range.end.subtract({ years: 1 }),
        preset: 1
      };
    }
  },
  {
    key: 2,
    label: message("Custom"),
    getRangeValue: (range) => {
      return {
        start: range.start.subtract({ weeks: 1 }),
        end: range.end.subtract({ weeks: 1 }),
        preset: 2
      };
    }
  }
];
function DateRangeComparePresetList({
  originalRangeValue,
  onPresetSelected,
  selectedValue
}) {
  return /* @__PURE__ */ jsx(List, { children: DateRangeComparePresets.map((preset) => /* @__PURE__ */ jsx(
    ListItem,
    {
      borderRadius: "rounded-none",
      capitalizeFirst: true,
      isSelected: (selectedValue == null ? void 0 : selectedValue.preset) === preset.key,
      onSelected: () => {
        const newValue = preset.getRangeValue(originalRangeValue);
        onPresetSelected(newValue);
      },
      children: /* @__PURE__ */ jsx(Trans, { ...preset.label })
    },
    preset.key
  )) });
}
function DateRangeDialog({
  state,
  compareState,
  showInlineDatePickerField = false,
  compareVisibleDefault = false
}) {
  const isTablet = useIsTabletMediaQuery();
  const { close } = useDialogContext();
  const initialStateRef = useRef(state);
  const hasPlaceholder = state.isPlaceholder.start || state.isPlaceholder.end;
  const [compareVisible, setCompareVisible] = useState(compareVisibleDefault);
  const footer = /* @__PURE__ */ jsxs(
    DialogFooter,
    {
      dividerTop: true,
      startAction: !hasPlaceholder && !isTablet ? /* @__PURE__ */ jsx("div", { className: "text-xs", children: /* @__PURE__ */ jsx(
        FormattedDateTimeRange,
        {
          start: state.selectedValue.start.toDate(),
          end: state.selectedValue.end.toDate(),
          options: { dateStyle: "medium" }
        }
      ) }) : void 0,
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "text",
            size: "xs",
            onClick: () => {
              state.setSelectedValue(initialStateRef.current.selectedValue);
              state.setIsPlaceholder(initialStateRef.current.isPlaceholder);
              close();
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "primary",
            size: "xs",
            onClick: () => {
              const value = state.selectedValue;
              if (compareState && compareVisible) {
                value.compareStart = compareState.selectedValue.start;
                value.compareEnd = compareState.selectedValue.end;
              }
              close(value);
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Select" })
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ jsxs(Dialog, { size: "auto", children: [
    /* @__PURE__ */ jsxs(DialogBody, { className: "flex", padding: "p-0", children: [
      !isTablet && /* @__PURE__ */ jsxs("div", { className: "min-w-192 py-14", children: [
        /* @__PURE__ */ jsx(
          DatePresetList,
          {
            selectedValue: state.selectedValue,
            onPresetSelected: (preset) => {
              state.setSelectedValue(preset);
              if (state.closeDialogOnSelection) {
                close(preset);
              }
            }
          }
        ),
        !!compareState && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Switch,
            {
              className: "mx-20 mb-10 mt-14",
              checked: compareVisible,
              onChange: (e) => setCompareVisible(e.target.checked),
              children: /* @__PURE__ */ jsx(Trans, { message: "Compare" })
            }
          ),
          compareVisible && /* @__PURE__ */ jsx(
            DateRangeComparePresetList,
            {
              originalRangeValue: state.selectedValue,
              selectedValue: compareState.selectedValue,
              onPresetSelected: (preset) => {
                compareState.setSelectedValue(preset);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: /* @__PURE__ */ jsx(
        Calendars,
        {
          state,
          compareState,
          showInlineDatePickerField,
          compareVisible
        }
      ) })
    ] }),
    !state.closeDialogOnSelection && footer
  ] });
}
function Calendars({
  state,
  compareState,
  showInlineDatePickerField,
  compareVisible
}) {
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      initial: { width: 0, overflow: "hidden" },
      animate: { width: "auto" },
      exit: { width: 0, overflow: "hidden" },
      transition: { type: "tween", duration: 0.125 },
      className: "border-l px-20 pb-20 pt-10",
      children: [
        showInlineDatePickerField && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InlineDatePickerField, { state }),
          !!compareState && compareVisible && /* @__PURE__ */ jsx(
            InlineDatePickerField,
            {
              state: compareState,
              label: /* @__PURE__ */ jsx(Trans, { message: "Compare" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-start gap-36", children: /* @__PURE__ */ jsx(Calendar, { state, visibleMonths: 2 }) })
      ]
    }
  );
}
function InlineDatePickerField({ state, label }) {
  const { selectedValue, setSelectedValue } = state;
  return /* @__PURE__ */ jsxs(DatePickerField, { className: "mb-20 mt-10", label, children: [
    /* @__PURE__ */ jsx(
      DateSegmentList,
      {
        state,
        value: selectedValue.start,
        onChange: (newValue) => {
          setSelectedValue({ ...selectedValue, start: newValue });
        }
      }
    ),
    /* @__PURE__ */ jsx(ArrowRightAltIcon, { className: "block flex-shrink-0 text-muted", size: "md" }),
    /* @__PURE__ */ jsx(
      DateSegmentList,
      {
        state,
        value: selectedValue.end,
        onChange: (newValue) => {
          setSelectedValue({ ...selectedValue, end: newValue });
        }
      }
    )
  ] });
}
function DateRangePicker(props) {
  var _a2, _b2;
  const { granularity, closeDialogOnSelection, ...fieldProps } = props;
  const state = useDateRangePickerState(props);
  const inputRef = useRef(null);
  const isMobile = useIsMobileMediaQuery();
  const hideCalendarIcon = isMobile && granularity !== "day";
  const dialog = /* @__PURE__ */ jsx(
    DialogTrigger,
    {
      offset: 8,
      placement: "bottom-start",
      isOpen: state.calendarIsOpen,
      onOpenChange: state.setCalendarIsOpen,
      type: "popover",
      triggerRef: inputRef,
      returnFocusToTrigger: false,
      moveFocusToDialog: false,
      children: /* @__PURE__ */ jsx(DateRangeDialog, { state })
    }
  );
  const openOnClick = {
    onClick: (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isHourSegment$1(e)) {
        state.setCalendarIsOpen(true);
      } else {
        state.setCalendarIsOpen(false);
      }
    }
  };
  const value = state.selectedValue;
  const onChange = state.setSelectedValue;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      DatePickerField,
      {
        ref: inputRef,
        wrapperProps: openOnClick,
        endAdornment: !hideCalendarIcon ? /* @__PURE__ */ jsx(DateRangeIcon, {}) : void 0,
        ...fieldProps,
        children: [
          /* @__PURE__ */ jsx(
            DateSegmentList,
            {
              isPlaceholder: (_a2 = state.isPlaceholder) == null ? void 0 : _a2.start,
              state,
              segmentProps: openOnClick,
              value: value.start,
              onChange: (newValue) => {
                onChange({ start: newValue, end: value.end });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            ArrowRightAltIcon,
            {
              className: "block flex-shrink-0 text-muted",
              size: "md"
            }
          ),
          /* @__PURE__ */ jsx(
            DateSegmentList,
            {
              isPlaceholder: (_b2 = state.isPlaceholder) == null ? void 0 : _b2.end,
              state,
              segmentProps: openOnClick,
              value: value.end,
              onChange: (newValue) => {
                onChange({ start: value.start, end: newValue });
              }
            }
          )
        ]
      }
    ),
    dialog
  ] });
}
function isHourSegment$1(e) {
  return ["hour", "minute", "dayPeriod"].includes(
    e.currentTarget.ariaLabel || ""
  );
}
function FormDateRangePicker(props) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange: (e) => {
      onChange(e ? dateRangeToAbsoluteRange(e) : null);
    },
    onBlur,
    value: absoluteRangeToDateRange(value),
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    inputRef: ref
  };
  return /* @__PURE__ */ jsx(DateRangePicker, { ...mergeProps(formProps, props) });
}
function absoluteRangeToDateRange(props) {
  const { start, end, preset } = props || {};
  const dateRange = { preset };
  try {
    if (start) {
      dateRange.start = typeof start === "string" ? parseAbsoluteToLocal(start) : start;
    }
    if (end) {
      dateRange.end = typeof end === "string" ? parseAbsoluteToLocal(end) : end;
    }
  } catch (e) {
  }
  return dateRange;
}
function dateRangeToAbsoluteRange({
  start,
  end,
  preset
} = {}) {
  const absoluteRange = {
    preset
  };
  if (start) {
    absoluteRange.start = start.toAbsoluteString();
  }
  if (end) {
    absoluteRange.end = end.toAbsoluteString();
  }
  return absoluteRange;
}
function timestampFilter(options) {
  var _a2;
  return {
    ...options,
    defaultOperator: FilterOperator.between,
    control: {
      type: FilterControlType.DateRangePicker,
      defaultValue: ((_a2 = options.control) == null ? void 0 : _a2.defaultValue) || dateRangeToAbsoluteRange(
        DateRangePresets[3].getRangeValue()
      )
    }
  };
}
function createdAtFilter(options) {
  return timestampFilter({
    key: "created_at",
    label: message("Date created"),
    ...options
  });
}
function updatedAtFilter(options) {
  return timestampFilter({
    key: "updated_at",
    label: message("Last updated"),
    ...options
  });
}
const BackendFiltersUrlKey = "filters";
function decodeBackendFilters(encodedFilters) {
  if (!encodedFilters)
    return [];
  let filtersFromQuery = [];
  try {
    filtersFromQuery = JSON.parse(atob(decodeURIComponent(encodedFilters)));
    filtersFromQuery.map((filterValue) => {
      if (filterValue.valueKey != null) {
        filterValue.value = filterValue.valueKey;
      }
      return filterValue;
    });
  } catch (e) {
  }
  return filtersFromQuery;
}
function encodeBackendFilters(filterValues, filters) {
  if (!filterValues)
    return "";
  filterValues = !filters ? filterValues : filterValues.filter((item) => item.value !== "").map((item) => transformValue(item, filters));
  filterValues = filterValues.filter((fm) => !fm.isInactive);
  if (!filterValues.length) {
    return "";
  }
  return encodeURIComponent(btoa(JSON.stringify(filterValues)));
}
function transformValue(filterValue, filters) {
  var _a2;
  const filterConfig = filters.find((f) => f.key === filterValue.key);
  if ((filterConfig == null ? void 0 : filterConfig.control.type) === "select") {
    const option = (filterConfig.control.options || []).find(
      (o) => o.key === filterValue.value
    );
    if (option) {
      return { ...filterValue, value: option.value, valueKey: option.key };
    }
  }
  if ((_a2 = filterConfig == null ? void 0 : filterConfig.extraFilters) == null ? void 0 : _a2.length) {
    filterValue["extraFilters"] = filterConfig.extraFilters;
  }
  return filterValue;
}
function useBackendFilterUrlParams(filters, pinnedFilters) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const encodedFilters = searchParams.get(BackendFiltersUrlKey);
  const decodedFilters = useMemo(() => {
    if (!filters)
      return [];
    const decoded = decodeBackendFilters(encodedFilters);
    (pinnedFilters || []).forEach((key) => {
      if (!decoded.find((f) => f.key === key)) {
        const config = filters.find((f) => f.key === key);
        decoded.push({
          key,
          value: config.control.defaultValue,
          operator: config.defaultOperator,
          isInactive: true
        });
      }
    });
    decoded.sort(
      (a, b) => filters.findIndex((f) => f.key === a.key) - filters.findIndex((f) => f.key === b.key)
    );
    return decoded;
  }, [encodedFilters, pinnedFilters, filters]);
  const getDecodedWithoutKeys = useCallback(
    (values) => {
      const newFilters = [...decodedFilters];
      values.forEach((value) => {
        const key = typeof value === "object" ? value.key : value;
        const index = newFilters.findIndex((f) => f.key === key);
        if (index > -1) {
          newFilters.splice(index, 1);
        }
      });
      return newFilters;
    },
    [decodedFilters]
  );
  const replaceAll = useCallback(
    (filterValues) => {
      const encodedFilters2 = encodeBackendFilters(filterValues, filters);
      if (encodedFilters2) {
        searchParams.set(BackendFiltersUrlKey, encodedFilters2);
      } else {
        searchParams.delete(BackendFiltersUrlKey);
      }
      navigate({ search: `?${searchParams}` }, { replace: true });
    },
    [filters, navigate, searchParams]
  );
  const add = useCallback(
    (filterValues) => {
      const existing = getDecodedWithoutKeys(filterValues);
      const decodedFilters2 = [...existing, ...filterValues];
      replaceAll(decodedFilters2);
    },
    [getDecodedWithoutKeys, replaceAll]
  );
  const remove = useCallback(
    (key) => replaceAll(getDecodedWithoutKeys([key])),
    [getDecodedWithoutKeys, replaceAll]
  );
  return {
    add,
    remove,
    replaceAll,
    decodedFilters,
    encodedFilters
  };
}
const DatatableDataQueryKey = (endpoint2, params2) => {
  const key = endpoint2.split("/");
  if (params2) {
    key.push(params2);
  }
  return key;
};
function useDatatableData(endpoint2, params2, options, onLoad) {
  if (!params2.paginate) {
    params2.paginate = "preferLengthAware";
  }
  return useQuery({
    queryKey: DatatableDataQueryKey(endpoint2, params2),
    queryFn: ({ signal }) => paginate(endpoint2, params2, onLoad, signal),
    placeholderData: keepPreviousData,
    ...options
  });
}
async function paginate(endpoint2, params2, onLoad, signal) {
  if (params2.query) {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  const response = await apiClient.get(endpoint2, { params: params2, signal: params2.query ? signal : void 0 }).then((response2) => response2.data);
  onLoad == null ? void 0 : onLoad(response);
  return response;
}
const DataTableContext = React.createContext(
  null
);
function useDataTable() {
  return useContext(DataTableContext);
}
function isCtrlKeyPressed(e) {
  if (isMac()) {
    return e.metaKey;
  }
  return e.ctrlKey;
}
function useGridNavigation(props) {
  const { cellCount, rowCount } = props;
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        focusSiblingCell(e, { cell: { op: "decrement" } }, props);
        break;
      case "ArrowRight":
        focusSiblingCell(e, { cell: { op: "increment" } }, props);
        break;
      case "ArrowUp":
        focusSiblingCell(e, { row: { op: "decrement" } }, props);
        break;
      case "ArrowDown":
        focusSiblingCell(e, { row: { op: "increment" } }, props);
        break;
      case "PageUp":
        focusSiblingCell(e, { row: { op: "decrement", count: 5 } }, props);
        break;
      case "PageDown":
        focusSiblingCell(e, { row: { op: "increment", count: 5 } }, props);
        break;
      case "Tab":
        focusFirstElementAfterGrid(e);
        break;
      case "Home":
        if (isCtrlKeyPressed(e)) {
          focusSiblingCell(
            e,
            {
              row: { op: "decrement", count: rowCount },
              cell: { op: "decrement", count: cellCount }
            },
            props
          );
        } else {
          focusSiblingCell(
            e,
            { cell: { op: "decrement", count: cellCount } },
            props
          );
        }
        break;
      case "End":
        if (isCtrlKeyPressed(e)) {
          focusSiblingCell(
            e,
            {
              row: { op: "increment", count: rowCount },
              cell: { op: "increment", count: cellCount }
            },
            props
          );
        } else {
          focusSiblingCell(
            e,
            { cell: { op: "increment", count: cellCount } },
            props
          );
        }
        break;
    }
  };
  return { onKeyDown };
}
function focusSiblingCell(e, operations, { cellCount, rowCount }) {
  var _a2, _b2, _c, _d, _e, _f, _g;
  if (((_a2 = document.activeElement) == null ? void 0 : _a2.tagName) === "input")
    return;
  e.preventDefault();
  const grid = e.currentTarget;
  const currentCell = e.target.closest("[aria-colindex]");
  if (!currentCell || !grid)
    return;
  const row = currentCell.closest("[aria-rowindex]");
  if (!row)
    return;
  let rowIndex = parseInt(row.getAttribute("aria-rowindex"));
  let cellIndex = parseInt(currentCell.getAttribute("aria-colindex"));
  if (Number.isNaN(rowIndex) || Number.isNaN(cellIndex))
    return;
  const rowOpCount = ((_b2 = operations.row) == null ? void 0 : _b2.count) ?? 1;
  if (((_c = operations.row) == null ? void 0 : _c.op) === "increment") {
    rowIndex = Math.min(rowCount, rowIndex + rowOpCount);
  } else if (((_d = operations.row) == null ? void 0 : _d.op) === "decrement") {
    rowIndex = Math.max(1, rowIndex - rowOpCount);
  }
  const cellOpCount = ((_e = operations.cell) == null ? void 0 : _e.count) ?? 1;
  if (((_f = operations.cell) == null ? void 0 : _f.op) === "increment") {
    cellIndex = Math.min(cellCount, cellIndex + cellOpCount);
  } else if (((_g = operations.cell) == null ? void 0 : _g.op) === "decrement") {
    cellIndex = Math.max(1, cellIndex - cellOpCount);
  }
  const nextCell = grid.querySelector(
    `[aria-rowindex="${rowIndex}"] [aria-colindex="${cellIndex}"]`
  );
  if (!nextCell)
    return;
  const walker = getFocusableTreeWalker(nextCell);
  const nextFocusableElement = walker.nextNode() || nextCell;
  currentCell.setAttribute("tabindex", "-1");
  nextFocusableElement.setAttribute("tabindex", "0");
  nextFocusableElement.focus();
}
function focusFirstElementAfterGrid(e) {
  const grid = e.currentTarget;
  if (e.shiftKey) {
    grid.focus();
  } else {
    const walker = getFocusableTreeWalker(grid, { tabbable: true });
    let next;
    let last;
    do {
      last = walker.lastChild();
      if (last) {
        next = last;
      }
    } while (last);
    if (next && !next.contains(document.activeElement)) {
      focusWithoutScrolling(next);
    }
  }
}
const TableContext = createContext(null);
function useTableCellStyle({ index, isHeader }) {
  const {
    columns,
    cellHeight = "h-46",
    headerCellHeight = "h-46"
  } = useContext(TableContext);
  const column = columns[index];
  const userPadding = column == null ? void 0 : column.padding;
  let justify = "justify-start";
  if ((column == null ? void 0 : column.align) === "center") {
    justify = "justify-center";
  } else if ((column == null ? void 0 : column.align) === "end") {
    justify = "justify-end";
  }
  return clsx(
    "flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis outline-none focus-visible:outline focus-visible:outline-offset-2",
    isHeader ? headerCellHeight : cellHeight,
    (column == null ? void 0 : column.width) ?? "flex-1",
    column == null ? void 0 : column.maxWidth,
    column == null ? void 0 : column.minWidth,
    justify,
    userPadding,
    column == null ? void 0 : column.className
  );
}
function TableCell({
  rowIndex,
  rowIsHovered,
  index,
  item,
  id
}) {
  const { columns } = useContext(TableContext);
  const column = columns[index];
  const rowContext = useMemo(() => {
    return {
      index: rowIndex,
      isHovered: rowIsHovered,
      isPlaceholder: item.isPlaceholder
    };
  }, [rowIndex, rowIsHovered, item.isPlaceholder]);
  const style = useTableCellStyle({
    index,
    isHeader: false
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      tabIndex: -1,
      role: "gridcell",
      "aria-colindex": index + 1,
      id,
      className: style,
      children: /* @__PURE__ */ jsx("div", { className: "w-full min-w-0 overflow-hidden overflow-ellipsis", children: column.body(item, rowContext) })
    }
  );
}
function usePointerEvents({
  onMoveStart,
  onMove,
  onMoveEnd,
  minimumMovement = 0,
  preventDefault,
  stopPropagation = true,
  onPress,
  onLongPress,
  ...props
}) {
  const stateRef = useRef({
    lastPosition: { x: 0, y: 0 },
    started: false,
    longPressTriggered: false
  });
  const state = stateRef.current;
  const { addGlobalListener, removeGlobalListener } = useGlobalListeners();
  const start = (e) => {
    if (!state.el)
      return;
    const result = onMoveStart == null ? void 0 : onMoveStart(e, state.el);
    if (result === false)
      return;
    state.originalTouchAction = state.el.style.touchAction;
    state.el.style.touchAction = "none";
    state.originalUserSelect = document.documentElement.style.userSelect;
    document.documentElement.style.userSelect = "none";
    state.started = true;
  };
  const onPointerDown = (e) => {
    var _a2;
    if (e.button === 0 && state.id == null) {
      state.started = false;
      const result = (_a2 = props.onPointerDown) == null ? void 0 : _a2.call(props, e);
      if (result === false)
        return;
      if (stopPropagation) {
        e.stopPropagation();
      }
      if (preventDefault) {
        e.preventDefault();
      }
      state.id = e.pointerId;
      state.el = e.currentTarget;
      state.lastPosition = { x: e.clientX, y: e.clientY };
      if (onLongPress) {
        state.longPressTimer = setTimeout(() => {
          onLongPress(e, state.el);
          state.longPressTriggered = true;
        }, 400);
      }
      if (onMoveStart || onMove) {
        addGlobalListener(window, "pointermove", onPointerMove, false);
      }
      addGlobalListener(window, "pointerup", onPointerUp, false);
      addGlobalListener(window, "pointercancel", onPointerUp, false);
    }
  };
  const onPointerMove = (e) => {
    if (e.pointerId === state.id) {
      const deltaX = e.clientX - state.lastPosition.x;
      const deltaY = e.clientY - state.lastPosition.y;
      if ((Math.abs(deltaX) >= minimumMovement || Math.abs(deltaY) >= minimumMovement) && !state.started) {
        start(e);
      }
      if (state.started) {
        onMove == null ? void 0 : onMove(e, deltaX, deltaY);
        state.lastPosition = { x: e.clientX, y: e.clientY };
      }
    }
  };
  const onPointerUp = (e) => {
    var _a2;
    if (e.pointerId === state.id) {
      if (state.longPressTimer) {
        clearTimeout(state.longPressTimer);
      }
      const longPressTriggered = state.longPressTriggered;
      state.longPressTriggered = false;
      if (state.started) {
        onMoveEnd == null ? void 0 : onMoveEnd(e);
      }
      if (state.el) {
        if (e.type !== "pointercancel") {
          (_a2 = props.onPointerUp) == null ? void 0 : _a2.call(props, e, state.el);
          if (e.target && state.el.contains(e.target)) {
            if (longPressTriggered) {
              onLongPress == null ? void 0 : onLongPress(e, state.el);
            } else {
              onPress == null ? void 0 : onPress(e, state.el);
            }
          }
        }
        document.documentElement.style.userSelect = state.originalUserSelect || "";
        state.el.style.touchAction = state.originalTouchAction || "";
      }
      state.id = void 0;
      state.started = false;
      removeGlobalListener(window, "pointermove", onPointerMove, false);
      removeGlobalListener(window, "pointerup", onPointerUp, false);
      removeGlobalListener(window, "pointercancel", onPointerUp, false);
    }
  };
  return {
    domProps: {
      onPointerDown: createEventHandler(onPointerDown)
    }
  };
}
function isCtrlOrShiftPressed(e) {
  return e.shiftKey || isCtrlKeyPressed(e);
}
function useTableRowStyle({ index, isSelected, isHeader }) {
  const isDarkMode = useIsDarkMode();
  const isMobile = useIsMobileMediaQuery();
  const { hideBorder, enableSelection, collapseOnMobile, onAction } = useContext(TableContext);
  const isFirst = index === 0;
  return clsx(
    "flex gap-x-16 break-inside-avoid outline-none border border-transparent",
    onAction && "cursor-pointer",
    isMobile && collapseOnMobile && hideBorder ? "mb-8 pl-8 pr-0 rounded" : "px-16",
    !hideBorder && "border-b-divider",
    !hideBorder && isFirst && "border-t-divider",
    isSelected && !isDarkMode && "bg-primary/selected hover:bg-primary/focus focus-visible:bg-primary/focus",
    isSelected && isDarkMode && "bg-selected hover:bg-focus focus-visible:bg-focus",
    !isSelected && !isHeader && (enableSelection || onAction) && "focus-visible:bg-focus hover:bg-hover"
  );
}
const interactableElements = ["button", "a", "input", "select", "textarea"];
function TableRow({
  item,
  index,
  renderAs,
  className,
  style
}) {
  const {
    selectedRows,
    columns,
    toggleRow,
    selectRow,
    onAction,
    selectRowOnContextMenu,
    enableSelection,
    selectionStyle,
    hideHeaderRow
  } = useContext(TableContext);
  const isTouchDevice = useRef(false);
  const isSelected = selectedRows.includes(item.id);
  const [isHovered, setIsHovered] = useState(false);
  const clickedOnInteractable = (e) => {
    return e.target.closest(interactableElements.join(","));
  };
  const doubleClickHandler = (e) => {
    if (selectionStyle === "highlight" && onAction && !isTouchDevice.current && !clickedOnInteractable(e)) {
      e.preventDefault();
      e.stopPropagation();
      onAction(item, index);
    }
  };
  const anyRowsSelected = !!selectedRows.length;
  const handleRowTap = (e) => {
    if (clickedOnInteractable(e))
      return;
    if (selectionStyle === "checkbox") {
      if (enableSelection && (anyRowsSelected || !onAction)) {
        toggleRow(item);
      } else if (onAction) {
        onAction(item, index);
      }
    } else if (selectionStyle === "highlight") {
      if (isTouchDevice.current) {
        if (enableSelection && anyRowsSelected) {
          toggleRow(item);
        } else {
          onAction == null ? void 0 : onAction(item, index);
        }
      } else if (enableSelection) {
        selectRow(item, isCtrlOrShiftPressed(e));
      }
    }
  };
  const { domProps } = usePointerEvents({
    onPointerDown: (e) => {
      isTouchDevice.current = e.pointerType === "touch";
    },
    onPress: handleRowTap,
    onLongPress: enableSelection ? () => {
      if (isTouchDevice.current) {
        toggleRow(item);
      }
    } : void 0
  });
  const keyboardHandler = (e) => {
    if (enableSelection && e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      if (selectionStyle === "checkbox") {
        toggleRow(item);
      } else {
        selectRow(item);
      }
    } else if (e.key === "Enter" && !selectedRows.length && onAction) {
      e.preventDefault();
      e.stopPropagation();
      onAction(item, index);
    }
  };
  const contextMenuHandler = (e) => {
    if (selectRowOnContextMenu && enableSelection) {
      if (!selectedRows.includes(item.id)) {
        selectRow(item);
      }
    }
    if (isTouchDevice.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const styleClassName = useTableRowStyle({ index, isSelected });
  const RowElement = renderAs || "div";
  return /* @__PURE__ */ jsx(
    RowElement,
    {
      role: "row",
      "aria-rowindex": index + 1 + (hideHeaderRow ? 0 : 1),
      "aria-selected": isSelected,
      tabIndex: -1,
      className: clsx(className, styleClassName),
      item: RowElement === "div" ? void 0 : item,
      onDoubleClick: createEventHandler(doubleClickHandler),
      onKeyDown: createEventHandler(keyboardHandler),
      onContextMenu: createEventHandler(contextMenuHandler),
      onPointerEnter: createEventHandler(() => setIsHovered(true)),
      onPointerLeave: createEventHandler(() => setIsHovered(false)),
      style,
      ...domProps,
      children: columns.map((column, cellIndex) => /* @__PURE__ */ jsx(
        TableCell,
        {
          rowIndex: index,
          rowIsHovered: isHovered,
          index: cellIndex,
          item
        },
        `${item.id}-${column.key}`
      ))
    }
  );
}
const CheckboxColumnConfig = {
  key: "checkbox",
  header: () => /* @__PURE__ */ jsx(SelectAllCheckbox, {}),
  align: "center",
  width: "w-24 flex-shrink-0",
  body: (item, row) => {
    if (row.isPlaceholder) {
      return /* @__PURE__ */ jsx(Skeleton, { size: "w-24 h-24", variant: "rect" });
    }
    return /* @__PURE__ */ jsx(SelectRowCheckbox, { item });
  }
};
function SelectRowCheckbox({ item }) {
  const { selectedRows, toggleRow } = useContext(TableContext);
  return /* @__PURE__ */ jsx(
    Checkbox,
    {
      checked: selectedRows.includes(item.id),
      onChange: () => toggleRow(item)
    }
  );
}
function SelectAllCheckbox() {
  const { trans } = useTrans();
  const { data, selectedRows, onSelectionChange } = useContext(TableContext);
  const allRowsSelected = !!data.length && data.length === selectedRows.length;
  const someRowsSelected = !allRowsSelected && !!selectedRows.length;
  return /* @__PURE__ */ jsx(
    Checkbox,
    {
      "aria-label": trans({ message: "Select all" }),
      isIndeterminate: someRowsSelected,
      checked: allRowsSelected,
      onChange: () => {
        if (allRowsSelected) {
          onSelectionChange([]);
        } else {
          onSelectionChange(data.map((d) => d.id));
        }
      }
    }
  );
}
const ArrowDownwardIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" }),
  "ArrowDownwardOutlined"
);
function HeaderCell({ index }) {
  const { columns, sortDescriptor, onSortChange, enableSorting } = useContext(TableContext);
  const column = columns[index];
  const style = useTableCellStyle({
    index,
    isHeader: true
  });
  const [isHovered, setIsHovered] = useState(false);
  const sortingKey = column.sortingKey || column.key;
  const allowSorting = column.allowsSorting && enableSorting;
  const { orderBy, orderDir } = sortDescriptor || {};
  const sortActive = allowSorting && orderBy === sortingKey;
  let ariaSort;
  if (sortActive && orderDir === "asc") {
    ariaSort = "ascending";
  } else if (sortActive && orderDir === "desc") {
    ariaSort = "descending";
  } else if (allowSorting) {
    ariaSort = "none";
  }
  const toggleSorting = () => {
    if (!allowSorting)
      return;
    let newSort;
    if (sortActive && orderDir === "desc") {
      newSort = { orderDir: "asc", orderBy: sortingKey };
    } else if (sortActive && orderDir === "asc") {
      newSort = { orderBy: void 0, orderDir: void 0 };
    } else {
      newSort = { orderDir: "desc", orderBy: sortingKey };
    }
    onSortChange == null ? void 0 : onSortChange(newSort);
  };
  const sortVisible = sortActive || isHovered;
  const sortVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-25%" }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "columnheader",
      tabIndex: -1,
      "aria-colindex": index + 1,
      "aria-sort": ariaSort,
      className: clsx(
        style,
        "text-xs font-medium text-muted",
        allowSorting && "cursor-pointer"
      ),
      onMouseEnter: () => {
        setIsHovered(true);
      },
      onMouseLeave: () => {
        setIsHovered(false);
      },
      onKeyDown: (e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggleSorting();
        }
      },
      onClick: toggleSorting,
      children: [
        column.hideHeader ? /* @__PURE__ */ jsx("div", { className: "opacity-0", children: column.header() }) : column.header(),
        /* @__PURE__ */ jsx(AnimatePresence, { children: allowSorting && /* @__PURE__ */ jsx(
          m.span,
          {
            variants: sortVariants,
            animate: sortVisible ? "visible" : "hidden",
            initial: false,
            transition: { type: "tween" },
            className: "-mt-2 ml-6 inline-block",
            "data-testid": "table-sort-button",
            "aria-hidden": !sortVisible,
            children: /* @__PURE__ */ jsx(
              ArrowDownwardIcon,
              {
                size: "xs",
                className: clsx(
                  "text-muted",
                  orderDir === "asc" && orderBy === sortingKey && "rotate-180 transition-transform"
                )
              }
            )
          },
          "sort-icon"
        ) })
      ]
    }
  );
}
function TableHeaderRow() {
  const { columns } = useContext(TableContext);
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "row",
      "aria-rowindex": 1,
      tabIndex: -1,
      className: "flex gap-x-16 px-16",
      children: columns.map((column, columnIndex) => /* @__PURE__ */ jsx(HeaderCell, { index: columnIndex }, column.key))
    }
  );
}
function Table({
  className,
  columns: userColumns,
  collapseOnMobile = true,
  hideHeaderRow = false,
  hideBorder = false,
  data,
  selectedRows: propsSelectedRows,
  defaultSelectedRows: propsDefaultSelectedRows,
  onSelectionChange: propsOnSelectionChange,
  sortDescriptor: propsSortDescriptor,
  onSortChange: propsOnSortChange,
  enableSorting = true,
  onDelete,
  enableSelection = true,
  selectionStyle = "checkbox",
  ariaLabelledBy,
  selectRowOnContextMenu,
  onAction,
  renderRowAs,
  tableBody,
  meta,
  tableRef: propsTableRef,
  closeOnInteractOutside = false,
  cellHeight,
  headerCellHeight,
  ...domProps
}) {
  const isMobile = useIsMobileMediaQuery();
  const isCollapsedMode = !!isMobile && collapseOnMobile;
  if (isCollapsedMode) {
    hideHeaderRow = true;
    hideBorder = true;
  }
  const [selectedRows, onSelectionChange] = useControlledState(
    propsSelectedRows,
    propsDefaultSelectedRows || [],
    propsOnSelectionChange
  );
  const [sortDescriptor, onSortChange] = useControlledState(
    propsSortDescriptor,
    void 0,
    propsOnSortChange
  );
  const toggleRow = useCallback(
    (item) => {
      const newValues = [...selectedRows];
      if (!newValues.includes(item.id)) {
        newValues.push(item.id);
      } else {
        const index = newValues.indexOf(item.id);
        newValues.splice(index, 1);
      }
      onSelectionChange(newValues);
    },
    [selectedRows, onSelectionChange]
  );
  const selectRow = useCallback(
    // allow deselecting all rows by passing in null
    (item, merge) => {
      let newValues = [];
      if (item) {
        newValues = merge ? [...selectedRows == null ? void 0 : selectedRows.filter((id) => id !== item.id), item.id] : [item.id];
      }
      onSelectionChange(newValues);
    },
    [selectedRows, onSelectionChange]
  );
  const columns = useMemo(() => {
    const filteredColumns = userColumns.filter((c) => {
      const visibleInMode = c.visibleInMode || "regular";
      if (visibleInMode === "all") {
        return true;
      }
      if (visibleInMode === "compact" && isCollapsedMode) {
        return true;
      }
      if (visibleInMode === "regular" && !isCollapsedMode) {
        return true;
      }
    });
    const showCheckboxCell = enableSelection && selectionStyle !== "highlight" && !isMobile;
    if (showCheckboxCell) {
      filteredColumns.unshift(CheckboxColumnConfig);
    }
    return filteredColumns;
  }, [isMobile, userColumns, enableSelection, selectionStyle, isCollapsedMode]);
  const contextValue = {
    isCollapsedMode,
    cellHeight,
    headerCellHeight,
    hideBorder,
    hideHeaderRow,
    selectedRows,
    onSelectionChange,
    enableSorting,
    enableSelection,
    selectionStyle,
    data,
    columns,
    sortDescriptor,
    onSortChange,
    toggleRow,
    selectRow,
    onAction,
    selectRowOnContextMenu,
    meta,
    collapseOnMobile
  };
  const navProps = useGridNavigation({
    cellCount: enableSelection ? columns.length + 1 : columns.length,
    rowCount: data.length + 1
  });
  const tableBodyProps = {
    renderRowAs
  };
  if (!tableBody) {
    tableBody = /* @__PURE__ */ jsx(BasicTableBody, { ...tableBodyProps });
  } else {
    tableBody = cloneElement(tableBody, tableBodyProps);
  }
  const tableRef = useObjectRef(propsTableRef);
  useInteractOutside({
    ref: tableRef,
    onInteractOutside: (e) => {
      if (closeOnInteractOutside && enableSelection && (selectedRows == null ? void 0 : selectedRows.length) && // don't deselect if clicking on a dialog (for example is table row has a context menu)
      !e.target.closest('[role="dialog"]')) {
        onSelectionChange([]);
      }
    }
  });
  return /* @__PURE__ */ jsx(TableContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxs(
    "div",
    {
      ...mergeProps(domProps, navProps, {
        onKeyDown: (e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            if (selectedRows == null ? void 0 : selectedRows.length) {
              onSelectionChange([]);
            }
          } else if (e.key === "Delete") {
            e.preventDefault();
            e.stopPropagation();
            if (selectedRows == null ? void 0 : selectedRows.length) {
              onDelete == null ? void 0 : onDelete(
                data.filter((item) => selectedRows == null ? void 0 : selectedRows.includes(item.id))
              );
            }
          } else if (isCtrlKeyPressed(e) && e.key === "a") {
            e.preventDefault();
            e.stopPropagation();
            if (enableSelection) {
              onSelectionChange(data.map((item) => item.id));
            }
          }
        }
      }),
      role: "grid",
      tabIndex: 0,
      "aria-rowcount": data.length + 1,
      "aria-colcount": columns.length + 1,
      ref: tableRef,
      "aria-multiselectable": enableSelection ? true : void 0,
      "aria-labelledby": ariaLabelledBy,
      className: clsx(
        className,
        "isolate select-none text-sm outline-none focus-visible:ring-2"
      ),
      children: [
        !hideHeaderRow && /* @__PURE__ */ jsx(TableHeaderRow, {}),
        tableBody
      ]
    }
  ) });
}
function BasicTableBody({ renderRowAs }) {
  const { data } = useContext(TableContext);
  return /* @__PURE__ */ jsx(Fragment, { children: data.map((item, rowIndex) => /* @__PURE__ */ jsx(
    TableRow,
    {
      item,
      index: rowIndex,
      renderAs: renderRowAs
    },
    item.id
  )) });
}
const defaultPerPage = 15;
const perPageOptions = [{ key: 10 }, { key: 15 }, { key: 20 }, { key: 50 }, { key: 100 }];
function DataTablePaginationFooter({
  query,
  onPerPageChange,
  onPageChange,
  className
}) {
  var _a2;
  const isMobile = useIsMobileMediaQuery();
  const numberFormatter = useNumberFormatter();
  const pagination = (_a2 = query.data) == null ? void 0 : _a2.pagination;
  if (!pagination)
    return null;
  const perPageSelect = onPerPageChange ? /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      minWidth: "min-w-auto",
      selectionMode: "single",
      disabled: query.isLoading,
      labelPosition: "side",
      size: "xs",
      label: /* @__PURE__ */ jsx(Trans, { message: "Items per page" }),
      selectedValue: pagination.per_page || defaultPerPage,
      onSelectionChange: (value) => onPerPageChange(value),
      children: perPageOptions.map((option) => /* @__PURE__ */ jsx(Item, { value: option.key, children: option.key }, option.key))
    }
  ) : null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex h-54 select-none items-center justify-end gap-20 px-20",
        className
      ),
      children: [
        !isMobile && perPageSelect,
        pagination.from && pagination.to && "total" in pagination ? /* @__PURE__ */ jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: ":from - :to of :total",
            values: {
              from: pagination.from,
              to: pagination.to,
              total: numberFormatter.format(pagination.total)
            }
          }
        ) }) : null,
        /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
          /* @__PURE__ */ jsx(
            IconButton,
            {
              disabled: query.isFetching || pagination.current_page < 2,
              onClick: () => {
                onPageChange == null ? void 0 : onPageChange((pagination == null ? void 0 : pagination.current_page) - 1);
              },
              children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              disabled: query.isFetching || !hasNextPage(pagination),
              onClick: () => {
                onPageChange == null ? void 0 : onPageChange((pagination == null ? void 0 : pagination.current_page) + 1);
              },
              children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
            }
          )
        ] })
      ]
    }
  );
}
const FilterAltIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7 6h10l-5.01 6.3L7 6zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z" }),
  "FilterAltOutlined"
);
const AccordionAnimation = {
  variants: {
    open: {
      height: "auto",
      visibility: "visible",
      transitionEnd: {
        overflow: "auto"
      }
    },
    closed: {
      height: 0,
      overflow: "hidden",
      transitionEnd: {
        visibility: "hidden"
      }
    }
  },
  transition: { type: "tween", duration: 0.2 }
};
const Accordion = React.forwardRef(
  ({
    variant = "default",
    mode = "single",
    children,
    className,
    isLazy,
    ...other
  }, ref) => {
    const [expandedValues, setExpandedValues] = useControlledState(
      other.expandedValues,
      other.defaultExpandedValues || [],
      other.onExpandedChange
    );
    const itemsCount = React.Children.count(children);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx(variant === "outline" && "space-y-10", className),
        ref,
        role: "presentation",
        children: /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(FocusScope, { children: React.Children.map(children, (child, index) => {
          if (!isValidElement(child))
            return null;
          return cloneElement(child, {
            key: child.key || index,
            value: child.props.value || index,
            isFirst: index === 0,
            isLast: index === itemsCount - 1,
            mode,
            variant,
            expandedValues,
            setExpandedValues,
            isLazy
          });
        }) }) })
      }
    );
  }
);
function AccordionItem(props) {
  const {
    children,
    label,
    disabled,
    bodyClassName,
    labelClassName,
    buttonPadding = "py-10 pl-14 pr-10",
    startIcon,
    description,
    endAppend,
    chevronPosition = "right",
    isFirst,
    mode,
    isLazy,
    variant,
    footerContent,
    onHeaderMouseEnter,
    onHeaderMouseLeave
  } = props;
  const expandedValues = props.expandedValues || [];
  const value = props.value || 0;
  const setExpandedValues = props.setExpandedValues || (() => {
  });
  const ref = useRef(null);
  const isExpanded = !disabled && expandedValues.includes(value);
  const wasExpandedOnce = useRef(false);
  if (isExpanded) {
    wasExpandedOnce.current = true;
  }
  const focusManager = useFocusManager();
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "ArrowUp":
        focusManager == null ? void 0 : focusManager.focusPrevious();
        break;
      case "Home":
        focusManager == null ? void 0 : focusManager.focusFirst();
        break;
      case "End":
        focusManager == null ? void 0 : focusManager.focusLast();
        break;
    }
  };
  const toggle = () => {
    const i = expandedValues.indexOf(value);
    if (i > -1) {
      const newKeys = [...expandedValues];
      newKeys.splice(i, 1);
      setExpandedValues(newKeys);
    } else if (mode === "single") {
      setExpandedValues([value]);
    } else {
      setExpandedValues([...expandedValues, value]);
    }
  };
  const chevron = /* @__PURE__ */ jsx("div", { className: clsx(variant === "minimal" && ""), children: /* @__PURE__ */ jsx(
    ArrowDropDownIcon,
    {
      "aria-hidden": "true",
      size: "md",
      className: clsx(
        disabled ? "text-disabled" : "text-muted",
        isExpanded && "rotate-180 transition-transform"
      )
    }
  ) });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        variant === "default" && "border-b",
        variant === "outline" && "rounded-panel border",
        disabled && "text-disabled"
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "h3",
          {
            className: clsx(
              "flex w-full items-center justify-between text-sm",
              disabled && "pointer-events-none",
              isFirst && variant === "default" && "border-t",
              isExpanded && variant !== "minimal" ? "border-b" : "border-b border-b-transparent",
              variant === "outline" ? isExpanded ? "rounded-panel-t" : "rounded-panel" : void 0
            ),
            onMouseEnter: onHeaderMouseEnter,
            onMouseLeave: onHeaderMouseLeave,
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  disabled,
                  "aria-expanded": isExpanded,
                  id: buttonId,
                  "aria-controls": panelId,
                  type: "button",
                  ref,
                  onKeyDown,
                  onClick: () => {
                    if (!disabled) {
                      toggle();
                    }
                  },
                  className: clsx(
                    "flex flex-auto items-center gap-10 text-left outline-none hover:bg-hover focus-visible:bg-primary/focus",
                    buttonPadding
                  ),
                  children: [
                    chevronPosition === "left" && chevron,
                    startIcon && cloneElement(startIcon, {
                      size: "md",
                      className: clsx(
                        startIcon.props.className,
                        disabled ? "text-disabled" : "text-muted"
                      )
                    }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-auto overflow-hidden overflow-ellipsis", children: [
                      /* @__PURE__ */ jsx("div", { className: labelClassName, "data-testid": "accordion-label", children: label }),
                      description && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: description })
                    ] }),
                    chevronPosition === "right" && chevron
                  ]
                }
              ),
              endAppend && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 px-4 text-sm text-muted", children: endAppend })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          m.div,
          {
            "aria-labelledby": id,
            role: "region",
            variants: AccordionAnimation.variants,
            transition: AccordionAnimation.transition,
            initial: false,
            animate: isExpanded ? "open" : "closed",
            children: [
              /* @__PURE__ */ jsx("div", { className: clsx("p-16", bodyClassName), children: !isLazy || wasExpandedOnce ? children : null }),
              footerContent
            ]
          }
        )
      ]
    }
  );
}
function SelectFilterPanel({
  filter
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    FormSelect,
    {
      size: "sm",
      name: `${filter.key}.value`,
      selectionMode: "single",
      showSearchField: filter.control.showSearchField,
      placeholder: filter.control.placeholder ? trans(filter.control.placeholder) : void 0,
      searchPlaceholder: filter.control.searchPlaceholder ? trans(filter.control.searchPlaceholder) : void 0,
      children: filter.control.options.map((option) => /* @__PURE__ */ jsx(Item, { value: option.key, children: /* @__PURE__ */ jsx(Trans, { ...option.label }) }, option.key))
    }
  );
}
function DateRangeFilterPanel({
  filter
}) {
  return /* @__PURE__ */ jsx(
    FormDateRangePicker,
    {
      min: filter.control.min,
      max: filter.control.max,
      size: "sm",
      name: `${filter.key}.value`,
      granularity: "day",
      closeDialogOnSelection: true
    }
  );
}
const Avatar = forwardRef(
  ({
    className,
    circle,
    size: size2 = "md",
    src,
    link,
    label,
    fallback = "generic",
    lazy: lazy2 = true,
    ...domProps
  }, ref) => {
    let renderedAvatar = src ? /* @__PURE__ */ jsx(
      "img",
      {
        ref,
        src,
        alt: label,
        loading: lazy2 ? "lazy" : void 0,
        className: "block h-full w-full object-cover"
      }
    ) : /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-alt dark:bg-chip", children: /* @__PURE__ */ jsx(
      AvatarPlaceholderIcon,
      {
        viewBox: "0 0 48 48",
        className: "h-full w-full text-muted"
      }
    ) });
    if (label) {
      renderedAvatar = /* @__PURE__ */ jsx(Tooltip, { label, children: renderedAvatar });
    }
    const wrapperProps = {
      ...domProps,
      className: clsx(
        className,
        "relative block overflow-hidden select-none flex-shrink-0",
        getSizeClassName(size2),
        circle ? "rounded-full" : "rounded"
      )
    };
    return link ? /* @__PURE__ */ jsx(Link, { ...wrapperProps, to: link, children: renderedAvatar }) : /* @__PURE__ */ jsx("div", { ...wrapperProps, children: renderedAvatar });
  }
);
function getSizeClassName(size2) {
  switch (size2) {
    case "xs":
      return "w-18 h-18";
    case "sm":
      return "w-24 h-24";
    case "md":
      return "w-32 h-32";
    case "lg":
      return "w-40 h-40";
    case "xl":
      return "w-60 h-60";
    default:
      return size2;
  }
}
function useNormalizedModels(endpoint2, queryParams, queryOptions) {
  return useQuery({
    queryKey: [endpoint2, queryParams],
    queryFn: () => fetchModels(endpoint2, queryParams),
    placeholderData: keepPreviousData,
    ...queryOptions
  });
}
async function fetchModels(endpoint2, params2) {
  return apiClient.get(endpoint2, { params: params2 }).then((r) => r.data);
}
function useNormalizedModel(endpoint2, queryParams, queryOptions) {
  return useQuery({
    queryKey: [endpoint2, queryParams],
    queryFn: () => fetchModel(endpoint2, queryParams),
    ...queryOptions
  });
}
async function fetchModel(endpoint2, params2) {
  return apiClient.get(endpoint2, { params: params2 }).then((r) => r.data);
}
function NormalizedModelField({
  label,
  className,
  background,
  value,
  defaultValue = "",
  placeholder = message("Select item..."),
  searchPlaceholder = message("Find an item..."),
  onChange,
  description,
  errorMessage,
  invalid,
  autoFocus,
  queryParams,
  endpoint: endpoint2,
  disabled,
  required
}) {
  var _a2;
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useControlledState(
    value,
    defaultValue,
    onChange
  );
  const query = useNormalizedModels(endpoint2, {
    query: inputValue,
    ...queryParams
  });
  const { trans } = useTrans();
  const fieldClassNames = getInputFieldClassNames({ size: "md" });
  if (selectedValue) {
    return /* @__PURE__ */ jsxs("div", { className, children: [
      /* @__PURE__ */ jsx("div", { className: fieldClassNames.label, children: label }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(
            "rounded-input border p-8",
            background,
            invalid && "border-danger"
          ),
          children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: /* @__PURE__ */ jsx(
            SelectedModelPreview,
            {
              disabled,
              endpoint: endpoint2,
              modelId: selectedValue,
              queryParams,
              onEditClick: () => {
                setSelectedValue("");
                setInputValue("");
                requestAnimationFrame(() => {
                  var _a3, _b2;
                  (_a3 = inputRef.current) == null ? void 0 : _a3.focus();
                  (_b2 = inputRef.current) == null ? void 0 : _b2.click();
                });
              }
            }
          ) })
        }
      ),
      description && !errorMessage && /* @__PURE__ */ jsx("div", { className: fieldClassNames.description, children: description }),
      errorMessage && /* @__PURE__ */ jsx("div", { className: fieldClassNames.error, children: errorMessage })
    ] });
  }
  return /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      className,
      showSearchField: true,
      invalid,
      errorMessage,
      description,
      color: "white",
      isAsync: true,
      background,
      placeholder: trans(placeholder),
      searchPlaceholder: trans(searchPlaceholder),
      label,
      isLoading: query.isFetching,
      items: (_a2 = query.data) == null ? void 0 : _a2.results,
      inputValue,
      onInputValueChange: setInputValue,
      selectionMode: "single",
      selectedValue,
      onSelectionChange: setSelectedValue,
      ref: inputRef,
      autoFocus,
      disabled,
      required,
      children: (model) => /* @__PURE__ */ jsx(
        Item,
        {
          value: model.id,
          description: model.description,
          startIcon: /* @__PURE__ */ jsx(Avatar, { src: model.image }),
          children: model.name
        },
        model.id
      )
    }
  );
}
function SelectedModelPreview({
  modelId,
  onEditClick,
  endpoint: endpoint2,
  disabled,
  queryParams
}) {
  const { data, isLoading } = useNormalizedModel(
    `${endpoint2}/${modelId}`,
    queryParams
  );
  if (isLoading || !(data == null ? void 0 : data.model)) {
    return /* @__PURE__ */ jsx(LoadingSkeleton$1, {}, "skeleton");
  }
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      className: clsx(
        "flex items-center gap-10",
        disabled && "pointer-events-none cursor-not-allowed text-disabled"
      ),
      ...opacityAnimation,
      children: [
        data.model.image && /* @__PURE__ */ jsx(Avatar, { src: data.model.image }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm leading-4", children: data.model.name }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: data.model.description })
        ] }),
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Change item" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            className: "ml-auto text-muted",
            size: "sm",
            onClick: onEditClick,
            disabled,
            children: /* @__PURE__ */ jsx(EditIcon, {})
          }
        ) })
      ]
    },
    "preview"
  );
}
function LoadingSkeleton$1() {
  return /* @__PURE__ */ jsxs(m.div, { className: "flex items-center gap-10", ...opacityAnimation, children: [
    /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-32 h-32" }),
    /* @__PURE__ */ jsxs("div", { className: "max-h-[36px] flex-auto", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "text-xs" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "max-h-8 text-xs" })
    ] }),
    /* @__PURE__ */ jsx(Skeleton, { variant: "icon", size: "w-24 h-24" })
  ] });
}
function FormNormalizedModelField({
  name,
  ...fieldProps
}) {
  const { clearErrors } = useFormContext();
  const {
    field: { onChange, value = "" },
    fieldState: { invalid, error }
  } = useController({
    name
  });
  return /* @__PURE__ */ jsx(
    NormalizedModelField,
    {
      value,
      onChange: (value2) => {
        onChange(value2);
        clearErrors(name);
      },
      invalid,
      errorMessage: error == null ? void 0 : error.message,
      ...fieldProps
    }
  );
}
function NormalizedModelFilterPanel({
  filter
}) {
  return /* @__PURE__ */ jsx(
    FormNormalizedModelField,
    {
      name: `${filter.key}.value`,
      endpoint: `normalized-models/${filter.control.model}`
    }
  );
}
const FilterOperatorNames = {
  "=": message("is"),
  "!=": message("is not"),
  ">": message("is greater than"),
  ">=": message("is greater than or equal to"),
  "<": message("is less than"),
  "<=": message("is less than or equal to"),
  has: message("Include"),
  doesntHave: message("Do not include"),
  between: message("Is between"),
  hasAll: message("Include all")
};
function InputFilterPanel({
  filter
}) {
  var _a2;
  const control = filter.control;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        selectionMode: "single",
        name: `${filter.key}.operator`,
        className: "mb-14",
        size: "sm",
        required: true,
        children: (_a2 = filter.operators) == null ? void 0 : _a2.map((operator) => /* @__PURE__ */ jsx(Item, { value: operator, children: /* @__PURE__ */ jsx(Trans, { ...FilterOperatorNames[operator] }) }, operator))
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        size: "sm",
        name: `${filter.key}.value`,
        type: filter.control.inputType,
        min: "minValue" in control ? control.minValue : void 0,
        max: "maxValue" in control ? control.maxValue : void 0,
        minLength: "minLength" in control ? control.minLength : void 0,
        maxLength: "maxLength" in control ? control.maxLength : void 0,
        required: true
      }
    )
  ] });
}
function BooleanFilterPanel({
  filter
}) {
  return null;
}
function ChipList({
  className,
  children,
  size: size2,
  color,
  radius,
  selectable,
  wrap = true
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "flex items-center gap-8",
        wrap && "flex-wrap",
        className
      ),
      children: Children.map(children, (chip) => {
        if (isValidElement(chip)) {
          return cloneElement(chip, {
            size: size2,
            color,
            selectable,
            radius
          });
        }
      })
    }
  );
}
function stringToChipValue(value) {
  return { id: value, name: `${value}`, description: `${value}` };
}
function ChipFieldInner(props, ref) {
  const fieldRef = useRef(null);
  const inputRef = useObjectRef(ref);
  const {
    displayWith = (v) => v.name,
    validateWith,
    children,
    suggestions,
    isLoading,
    inputValue,
    onInputValueChange,
    onItemSelected,
    placeholder,
    onOpenChange,
    chipSize = "sm",
    openMenuOnFocus = true,
    showEmptyMessage,
    value: propsValue,
    defaultValue,
    onChange: propsOnChange,
    valueKey,
    isAsync,
    allowCustomValue = true,
    showDropdownArrow,
    onChipClick,
    ...inputFieldProps
  } = props;
  const fieldClassNames = getInputFieldClassNames({
    ...props,
    flexibleHeight: true
  });
  const [value, onChange] = useChipFieldValueState(props);
  const [listboxIsOpen, setListboxIsOpen] = useState(false);
  const loadingIndicator = /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, size: "sm", "aria-label": "loading..." });
  const dropdownArrow = showDropdownArrow ? /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}) : null;
  const { fieldProps, inputProps } = useField({
    ...inputFieldProps,
    focusRef: inputRef,
    endAdornment: isLoading && listboxIsOpen ? loadingIndicator : dropdownArrow
  });
  return /* @__PURE__ */ jsx(Field, { fieldClassNames, ...fieldProps, children: /* @__PURE__ */ jsxs(
    Input,
    {
      ref: fieldRef,
      className: clsx("flex flex-wrap items-center", fieldClassNames.input),
      onClick: () => {
        var _a2;
        (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
      },
      children: [
        /* @__PURE__ */ jsx(
          ListWrapper,
          {
            displayChipUsing: displayWith,
            onChipClick,
            items: value,
            setItems: onChange,
            chipSize
          }
        ),
        /* @__PURE__ */ jsx(
          ChipInput,
          {
            size: props.size,
            showEmptyMessage,
            inputProps,
            inputValue,
            onInputValueChange,
            fieldRef,
            inputRef,
            chips: value,
            setChips: onChange,
            validateWith,
            isLoading,
            suggestions,
            placeholder,
            openMenuOnFocus,
            listboxIsOpen,
            setListboxIsOpen,
            allowCustomValue,
            children
          }
        )
      ]
    }
  ) });
}
function ListWrapper({
  items,
  setItems,
  displayChipUsing,
  chipSize,
  onChipClick
}) {
  const manager = useFocusManager();
  const removeItem = useCallback(
    (key) => {
      const i = items.findIndex((cr) => cr.id === key);
      const newItems = [...items];
      if (i > -1) {
        newItems.splice(i, 1);
        setItems(newItems);
      }
      return newItems;
    },
    [items, setItems]
  );
  return /* @__PURE__ */ jsx(
    ChipList,
    {
      className: clsx(
        "max-w-full flex-shrink-0 flex-wrap",
        chipSize === "xs" ? "my-6" : "my-8"
      ),
      size: chipSize,
      selectable: true,
      children: items.map((item) => /* @__PURE__ */ jsx(
        Chip,
        {
          errorMessage: item.errorMessage,
          adornment: item.image ? /* @__PURE__ */ jsx(Avatar, { circle: true, src: item.image }) : null,
          onClick: () => onChipClick == null ? void 0 : onChipClick(item),
          onRemove: () => {
            const newItems = removeItem(item.id);
            if (newItems.length) {
              manager == null ? void 0 : manager.focusPrevious({ tabbable: true });
            } else {
              manager == null ? void 0 : manager.focusLast();
            }
          },
          children: displayChipUsing(item)
        },
        item.id
      ))
    }
  );
}
function ChipInput(props) {
  const {
    inputRef,
    fieldRef,
    validateWith,
    setChips,
    chips,
    suggestions,
    inputProps,
    placeholder,
    openMenuOnFocus,
    listboxIsOpen,
    setListboxIsOpen,
    allowCustomValue,
    isLoading,
    size: size2
  } = props;
  const manager = useFocusManager();
  const addItems = useCallback(
    (items) => {
      items = (items || []).filter((item) => {
        const invalid = !item || !item.id || !item.name;
        const alreadyExists = chips.findIndex((cr) => cr.id === (item == null ? void 0 : item.id)) > -1;
        return !alreadyExists && !invalid;
      });
      if (!items.length)
        return;
      if (validateWith) {
        items = items.map((item) => validateWith(item));
      }
      setChips([...chips, ...items]);
    },
    [chips, setChips, validateWith]
  );
  const listbox = useListbox({
    ...props,
    clearInputOnItemSelection: true,
    isOpen: listboxIsOpen,
    onOpenChange: setListboxIsOpen,
    items: suggestions,
    selectionMode: "none",
    role: "listbox",
    virtualFocus: true,
    onItemSelected: (value) => {
      handleItemSelection(value);
    }
  });
  const {
    state: {
      activeIndex,
      setActiveIndex,
      isOpen,
      setIsOpen,
      inputValue,
      setInputValue
    },
    refs,
    listboxId,
    collection,
    onInputChange
  } = listbox;
  const handleItemSelection = (textValue) => {
    const option = collection.size && activeIndex != null ? [...collection.values()][activeIndex] : null;
    if (option == null ? void 0 : option.item) {
      addItems([option.item]);
    } else if (allowCustomValue) {
      addItems([stringToChipValue(option ? option.value : textValue)]);
    }
    setInputValue("");
    setActiveIndex(null);
    setIsOpen(false);
  };
  useLayoutEffect(() => {
    if (fieldRef.current && refs.reference.current !== fieldRef.current) {
      listbox.reference(fieldRef.current);
    }
  }, [fieldRef, listbox, refs]);
  const { handleTriggerKeyDown, handleListboxKeyboardNavigation } = useListboxKeyboardNavigation(listbox);
  const handleFocusAndClick = createEventHandler(() => {
    if (openMenuOnFocus && !isOpen) {
      setIsOpen(true);
    }
  });
  return /* @__PURE__ */ jsx(
    Listbox,
    {
      listbox,
      mobileOverlay: Popover,
      isLoading,
      onPointerDown: (e) => {
        e.preventDefault();
      },
      children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: clsx(
            "mx-8 my-4 min-w-30 flex-[1_1_60px] bg-transparent text-sm outline-none",
            size2 === "xs" ? "h-20" : "h-30"
          ),
          placeholder,
          ...mergeProps(inputProps, {
            ref: inputRef,
            value: inputValue,
            onChange: onInputChange,
            onPaste: (e) => {
              const paste = e.clipboardData.getData("text");
              const emails = paste.match(
                /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
              );
              if (emails) {
                e.preventDefault();
                const selection = window.getSelection();
                if (selection == null ? void 0 : selection.rangeCount) {
                  selection.deleteFromDocument();
                  addItems(emails.map((email) => stringToChipValue(email)));
                }
              }
            },
            "aria-autocomplete": "list",
            "aria-controls": isOpen ? listboxId : void 0,
            autoComplete: "off",
            autoCorrect: "off",
            spellCheck: "false",
            onKeyDown: (e) => {
              const input = e.target;
              if (e.key === "Enter") {
                e.preventDefault();
                handleItemSelection(input.value);
                return;
              }
              if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
                setInputValue("");
              }
              if (e.key === "ArrowUp" && isOpen && (activeIndex === 0 || activeIndex == null)) {
                setActiveIndex(null);
                return;
              }
              if (activeIndex != null && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
                e.preventDefault();
                return;
              }
              if ((e.key === "ArrowLeft" || e.key === "Backspace" || e.key === "Delete") && input.selectionStart === 0 && activeIndex == null && chips.length) {
                manager == null ? void 0 : manager.focusPrevious({ tabbable: true });
                return;
              }
              const handled = handleTriggerKeyDown(e);
              if (!handled) {
                handleListboxKeyboardNavigation(e);
              }
            },
            onFocus: handleFocusAndClick,
            onClick: handleFocusAndClick
          })
        }
      )
    }
  );
}
function useChipFieldValueState({
  onChange,
  value,
  defaultValue,
  valueKey
}) {
  const propsValue = useMemo(() => {
    return mixedValueToChipValue(value);
  }, [value]);
  const propsDefaultValue = useMemo(() => {
    return mixedValueToChipValue(defaultValue);
  }, [defaultValue]);
  const handleChange = useCallback(
    (value2) => {
      const newValue = valueKey ? value2.map((v) => v[valueKey]) : value2;
      onChange == null ? void 0 : onChange(newValue);
    },
    [onChange, valueKey]
  );
  return useControlledState(
    !propsValue ? void 0 : propsValue,
    propsDefaultValue || [],
    handleChange
  );
}
function mixedValueToChipValue(value) {
  if (value == null) {
    return void 0;
  }
  return value.map((v) => {
    return typeof v !== "object" ? stringToChipValue(v) : v;
  });
}
const ChipField = React.forwardRef(ChipFieldInner);
function FormChipField({ children, ...props }) {
  const {
    field: { onChange, onBlur, value = [], ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange,
    onBlur,
    value,
    invalid,
    errorMessage: error == null ? void 0 : error.message
  };
  return /* @__PURE__ */ jsx(ChipField, { ref, ...mergeProps(formProps, props), children });
}
function ChipFieldFilterPanel({
  filter
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      size: "sm",
      name: `${filter.key}.value`,
      valueKey: "id",
      allowCustomValue: false,
      showDropdownArrow: true,
      placeholder: filter.control.placeholder ? trans(filter.control.placeholder) : void 0,
      displayWith: (chip) => {
        var _a2;
        return (_a2 = filter.control.options.find((o) => o.key === chip.id)) == null ? void 0 : _a2.label.message;
      },
      suggestions: filter.control.options.map((o) => ({
        id: o.key,
        name: o.label.message
      })),
      children: (chip) => /* @__PURE__ */ jsx(Item, { value: chip.id, children: /* @__PURE__ */ jsx(Trans, { message: chip.name }) }, chip.id)
    }
  );
}
function AddFilterDialog({ filters }) {
  const { decodedFilters } = useBackendFilterUrlParams(filters);
  const { formId } = useDialogContext();
  const [expandedFilters, setExpandedFilters] = useState(
    () => {
      return decodedFilters.map((f) => f.key);
    }
  );
  const clearButton = /* @__PURE__ */ jsx(
    Button,
    {
      size: "xs",
      variant: "outline",
      className: "mr-auto",
      onClick: () => {
        setExpandedFilters([]);
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Clear" })
    }
  );
  const applyButton = /* @__PURE__ */ jsx(
    Button,
    {
      size: "xs",
      variant: "flat",
      color: "primary",
      className: "ml-auto",
      type: "submit",
      form: formId,
      children: /* @__PURE__ */ jsx(Trans, { message: "Apply" })
    }
  );
  return /* @__PURE__ */ jsxs(Dialog, { className: "min-w-[300px]", maxWidth: "max-w-400", size: "auto", children: [
    /* @__PURE__ */ jsx(
      DialogHeader,
      {
        padding: "px-14 py-10",
        leftAdornment: clearButton,
        rightAdornment: applyButton,
        children: /* @__PURE__ */ jsx(Trans, { message: "Filter" })
      }
    ),
    /* @__PURE__ */ jsx(DialogBody, { padding: "p-0", children: /* @__PURE__ */ jsx(
      FilterList$1,
      {
        filters,
        expandedFilters,
        setExpandedFilters
      }
    ) })
  ] });
}
function FilterList$1({
  filters,
  expandedFilters,
  setExpandedFilters
}) {
  const { decodedFilters, replaceAll } = useBackendFilterUrlParams(filters);
  const defaultValues = {};
  filters.forEach((filter) => {
    const appliedFilter = decodedFilters.find((f) => f.key === filter.key);
    defaultValues[filter.key] = (appliedFilter == null ? void 0 : appliedFilter.value) !== void 0 ? (
      // there might be some extra keys set on filter besides
      // "value" and "operator", so add the whole object to form
      appliedFilter
    ) : {
      value: filter.control.defaultValue,
      operator: filter.defaultOperator
    };
  });
  const form = useForm({ defaultValues });
  const { formId, close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    Form,
    {
      form,
      id: formId,
      onSubmit: (formValue) => {
        const filterValue = Object.entries(formValue).filter(
          ([key, fieldValue]) => expandedFilters.includes(key) && fieldValue !== void 0
        ).map(([key, fieldValue]) => ({
          key,
          ...fieldValue
          // value and operator from form
        }));
        replaceAll(filterValue);
        close();
      },
      children: /* @__PURE__ */ jsx(
        Accordion,
        {
          mode: "multiple",
          expandedValues: expandedFilters,
          onExpandedChange: setExpandedFilters,
          children: filters.map((filter) => /* @__PURE__ */ jsxs(
            AccordionItem,
            {
              startIcon: /* @__PURE__ */ jsx(Checkbox, { checked: expandedFilters.includes(filter.key) }),
              value: filter.key,
              label: /* @__PURE__ */ jsx(Trans, { ...filter.label }),
              bodyClassName: "max-h-288 overflow-y-auto compact-scrollbar",
              children: [
                filter.description && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: clsx(
                      "text-xs text-muted",
                      // boolean filter will have nothing in the panel, no need to add margin
                      filter.control.type !== FilterControlType.BooleanToggle && "mb-14"
                    ),
                    children: /* @__PURE__ */ jsx(Trans, { ...filter.description })
                  }
                ),
                /* @__PURE__ */ jsx(AddFilterDialogPanel, { filter })
              ]
            },
            filter.key
          ))
        }
      )
    }
  );
}
function AddFilterDialogPanel({ filter }) {
  switch (filter.control.type) {
    case FilterControlType.Select:
      return /* @__PURE__ */ jsx(
        SelectFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.ChipField:
      return /* @__PURE__ */ jsx(
        ChipFieldFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.DateRangePicker:
      return /* @__PURE__ */ jsx(
        DateRangeFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.SelectModel:
      return /* @__PURE__ */ jsx(
        NormalizedModelFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.Input:
      return /* @__PURE__ */ jsx(
        InputFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.BooleanToggle:
      return /* @__PURE__ */ jsx(
        BooleanFilterPanel,
        {
          filter
        }
      );
    case "custom":
      const CustomComponent = filter.control.panel;
      return /* @__PURE__ */ jsx(
        CustomComponent,
        {
          filter
        }
      );
    default:
      return null;
  }
}
function AddFilterButton({
  filters,
  icon = /* @__PURE__ */ jsx(FilterAltIcon, {}),
  color = "primary",
  variant = "outline",
  size: size2 = "sm",
  disabled,
  className
}) {
  const isMobile = useIsMobileMediaQuery();
  const desktopButton = /* @__PURE__ */ jsx(
    Button,
    {
      variant,
      color,
      startIcon: icon,
      disabled,
      size: size2,
      className,
      children: /* @__PURE__ */ jsx(Trans, { message: "Filter" })
    }
  );
  const mobileButton = /* @__PURE__ */ jsx(
    IconButton,
    {
      color,
      size: "sm",
      variant,
      disabled,
      className,
      children: icon
    }
  );
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", children: [
    isMobile ? mobileButton : desktopButton,
    /* @__PURE__ */ jsx(AddFilterDialog, { filters })
  ] });
}
function DataTableHeader({
  actions,
  filters,
  filtersLoading,
  searchPlaceholder = message("Type to search..."),
  searchValue = "",
  onSearchChange
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs(HeaderLayout, { children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        size: "sm",
        className: "mr-auto min-w-180 max-w-440 flex-auto",
        inputWrapperClassName: "mr-24 md:mr-0",
        placeholder: trans(searchPlaceholder),
        startAdornment: /* @__PURE__ */ jsx(SearchIcon, { size: "sm" }),
        value: searchValue,
        onChange: (e) => {
          onSearchChange(e.target.value);
        }
      }
    ),
    filters && /* @__PURE__ */ jsx(AddFilterButton, { filters, disabled: filtersLoading }),
    actions
  ] });
}
function HeaderLayout({ children, ...domProps }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "hidden-scrollbar relative mb-24 flex h-42 items-center gap-8 overflow-x-auto text-muted md:gap-12",
      ...domProps,
      children
    }
  );
}
const FilterListTriggerButton = forwardRef((props, ref) => {
  const { isInactive, filter, ...domProps } = props;
  if (isInactive) {
    return /* @__PURE__ */ jsx(InactiveFilterButton, { filter, ...domProps, ref });
  }
  return /* @__PURE__ */ jsx(ActiveFilterButton, { filter, ...domProps, ref });
});
const InactiveFilterButton = forwardRef(({ filter, ...domProps }, ref) => {
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      size: "xs",
      color: "paper",
      radius: "rounded-md",
      border: "border",
      ref,
      endIcon: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
      ...domProps,
      children: /* @__PURE__ */ jsx(Trans, { ...filter.label })
    }
  );
});
const ActiveFilterButton = forwardRef(({ filter, children, ...domProps }, ref) => {
  const isBoolean = filter.control.type === FilterControlType.BooleanToggle;
  return /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "outline",
      size: "xs",
      color: "primary",
      radius: "rounded-r-md",
      border: "border-y border-r",
      endIcon: !isBoolean && /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
      ref,
      ...domProps,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              !isBoolean && "border-r border-r-primary-light mr-8 pr-8"
            ),
            children: /* @__PURE__ */ jsx(Trans, { ...filter.label })
          }
        ),
        children
      ]
    }
  );
});
function FilterListItemDialogTrigger(props) {
  const { onValueChange, isInactive, filter, label } = props;
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      offset: 10,
      type: "popover",
      onClose: (value) => {
        if (value !== void 0) {
          onValueChange(value);
        }
      },
      children: [
        /* @__PURE__ */ jsx(FilterListTriggerButton, { isInactive, filter, children: label }),
        /* @__PURE__ */ jsx(FilterListControlDialog, { ...props })
      ]
    }
  );
}
function FilterListControlDialog({
  filter,
  panel,
  value,
  operator
}) {
  const form = useForm({
    defaultValues: {
      [filter.key]: { value, operator }
    }
  });
  const { close, formId } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { size: "xs", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { ...filter.label }) }),
    /* @__PURE__ */ jsx(DialogBody, { padding: "px-14 pt-14 pb-4 max-h-288", children: /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        id: formId,
        onSubmit: (formValue) => {
          close(formValue[filter.key]);
        },
        children: [
          filter.description && /* @__PURE__ */ jsx("div", { className: "text-muted text-xs mb-14", children: /* @__PURE__ */ jsx(Trans, { ...filter.description }) }),
          panel
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(
      Button,
      {
        form: formId,
        type: "submit",
        variant: "flat",
        color: "primary",
        size: "xs",
        children: /* @__PURE__ */ jsx(Trans, { message: "Apply" })
      }
    ) })
  ] });
}
function FilterListControl(props) {
  switch (props.filter.control.type) {
    case FilterControlType.DateRangePicker:
      return /* @__PURE__ */ jsx(DatePickerControl, { ...props });
    case FilterControlType.BooleanToggle:
      return /* @__PURE__ */ jsx(BooleanToggleControl, { ...props });
    case FilterControlType.Select:
      return /* @__PURE__ */ jsx(SelectControl, { ...props });
    case FilterControlType.ChipField:
      return /* @__PURE__ */ jsx(ChipFieldControl, { ...props });
    case FilterControlType.Input:
      return /* @__PURE__ */ jsx(InputControl, { ...props });
    case FilterControlType.SelectModel:
      return /* @__PURE__ */ jsx(SelectModelControl, { ...props });
    case FilterControlType.Custom:
      const Control = props.filter.control.listItem;
      return /* @__PURE__ */ jsx(Control, { ...props });
    default:
      return null;
  }
}
function DatePickerControl(props) {
  const { value, filter } = props;
  let valueLabel;
  if (value.preset !== void 0) {
    valueLabel = /* @__PURE__ */ jsx(Trans, { ...DateRangePresets[value.preset].label });
  } else {
    valueLabel = /* @__PURE__ */ jsx(
      FormattedDateTimeRange,
      {
        start: new Date(value.start),
        end: new Date(value.end),
        options: { dateStyle: "medium" }
      }
    );
  }
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: valueLabel,
      panel: /* @__PURE__ */ jsx(DateRangeFilterPanel, { filter })
    }
  );
}
function BooleanToggleControl({
  filter,
  isInactive,
  onValueChange
}) {
  return /* @__PURE__ */ jsx(
    FilterListTriggerButton,
    {
      onClick: () => {
        onValueChange({ value: filter.control.defaultValue });
      },
      filter,
      isInactive
    }
  );
}
function SelectControl(props) {
  const { filter, value } = props;
  const option = filter.control.options.find((o) => o.key === value);
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: option ? /* @__PURE__ */ jsx(Trans, { ...option.label }) : null,
      panel: /* @__PURE__ */ jsx(SelectFilterPanel, { filter })
    }
  );
}
function ChipFieldControl(props) {
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: /* @__PURE__ */ jsx(MultipleValues, { ...props }),
      panel: /* @__PURE__ */ jsx(ChipFieldFilterPanel, { filter: props.filter })
    }
  );
}
function MultipleValues(props) {
  const { trans } = useTrans();
  const { filter, value } = props;
  const options = value.map((v) => filter.control.options.find((o) => o.key === v));
  const maxShownCount = 3;
  const notShownCount = value.length - maxShownCount;
  const names2 = /* @__PURE__ */ jsx(Fragment, { children: options.filter(Boolean).slice(0, maxShownCount).map((o, i) => {
    let name = "";
    if (i !== 0) {
      name += ", ";
    }
    name += trans(o.label);
    return name;
  }) });
  return notShownCount > 0 ? /* @__PURE__ */ jsx(
    Trans,
    {
      message: ":names + :count more",
      values: { names: names2, count: notShownCount }
    }
  ) : names2;
}
function InputControl(props) {
  const { filter, value, operator } = props;
  const operatorLabel = operator ? /* @__PURE__ */ jsx(Trans, { ...FilterOperatorNames[operator] }) : null;
  const formattedValue = filter.control.inputType === "number" ? /* @__PURE__ */ jsx(FormattedNumber, { value }) : value;
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: /* @__PURE__ */ jsxs(Fragment, { children: [
        operatorLabel,
        " ",
        formattedValue
      ] }),
      panel: /* @__PURE__ */ jsx(InputFilterPanel, { filter })
    }
  );
}
function SelectModelControl(props) {
  const { value, filter } = props;
  const { isLoading, data } = useNormalizedModel(
    `normalized-models/${filter.control.model}/${value}`,
    void 0,
    { enabled: !!value }
  );
  const skeleton = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Skeleton, { variant: "avatar", size: "w-18 h-18 mr-6" }),
    /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-50" })
  ] });
  const modelPreview = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Avatar, { size: "xs", src: data == null ? void 0 : data.model.image, className: "mr-6" }),
    data == null ? void 0 : data.model.name
  ] });
  const label = isLoading || !data ? skeleton : modelPreview;
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label,
      panel: /* @__PURE__ */ jsx(NormalizedModelFilterPanel, { filter })
    }
  );
}
function FilterList({
  filters,
  pinnedFilters,
  className
}) {
  const { decodedFilters, remove, replaceAll } = useBackendFilterUrlParams(
    filters,
    pinnedFilters
  );
  if (!decodedFilters.length)
    return null;
  return /* @__PURE__ */ jsx("div", { className: clsx("flex items-center gap-6 overflow-x-auto", className), children: decodedFilters.map((field, index) => {
    const filter = filters.find((f) => f.key === field.key);
    if (!filter)
      return null;
    const handleValueChange = (payload) => {
      const newFilters = [...decodedFilters];
      newFilters.splice(index, 1, {
        key: filter.key,
        value: payload.value,
        isInactive: false,
        operator: payload.operator || filter.defaultOperator
      });
      replaceAll(newFilters);
    };
    return /* @__PURE__ */ jsxs("div", { children: [
      !field.isInactive && /* @__PURE__ */ jsx(
        IconButton,
        {
          variant: "outline",
          color: "primary",
          size: "xs",
          radius: "rounded-l-md",
          onClick: () => {
            remove(field.key);
          },
          children: /* @__PURE__ */ jsx(CloseIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        FilterListControl,
        {
          filter,
          isInactive: field.isInactive,
          value: field.valueKey != null ? field.valueKey : field.value,
          operator: field.operator,
          onValueChange: handleValueChange
        }
      )
    ] }, field.key);
  }) });
}
function SelectedStateDatatableHeader({
  actions,
  selectedItemsCount
}) {
  return /* @__PURE__ */ jsxs(HeaderLayout, { "data-testid": "datatable-selected-header", children: [
    /* @__PURE__ */ jsx("div", { className: "mr-auto", children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "[one 1 item|other :count items] selected",
        values: { count: selectedItemsCount }
      }
    ) }),
    actions
  ] });
}
function FilterListSkeleton() {
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      className: "flex items-center gap-6 h-30",
      ...opacityAnimation,
      children: [
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-144", radius: "rounded-md" }),
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-112", radius: "rounded-md" }),
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-172", radius: "rounded-md" })
      ]
    },
    "filter-list-skeleton"
  );
}
function DataTable({
  filters,
  filtersLoading,
  columns,
  searchPlaceholder,
  queryParams,
  endpoint: endpoint2,
  actions,
  selectedActions,
  emptyStateMessage,
  tableDomProps,
  onRowAction,
  enableSelection = true,
  selectionStyle = "checkbox",
  children,
  cellHeight,
  collapseTableOnMobile = true
}) {
  var _a2;
  const isMobile = useIsMobileMediaQuery();
  const { trans } = useTrans();
  const { encodedFilters } = useBackendFilterUrlParams(filters);
  const [params2, setParams] = useState({ perPage: 15 });
  const [selectedRows, setSelectedRows] = useState([]);
  const query = useDatatableData(
    endpoint2,
    {
      ...params2,
      ...queryParams,
      [BackendFiltersUrlKey]: encodedFilters
    },
    void 0,
    () => setSelectedRows([])
  );
  const isFiltering = !!(params2.query || params2.filters || encodedFilters);
  const pagination = (_a2 = query.data) == null ? void 0 : _a2.pagination;
  return /* @__PURE__ */ jsxs(
    DataTableContext.Provider,
    {
      value: {
        selectedRows,
        setSelectedRows,
        endpoint: endpoint2,
        params: params2,
        setParams,
        query
      },
      children: [
        children,
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: selectedRows.length ? /* @__PURE__ */ jsx(
          SelectedStateDatatableHeader,
          {
            selectedItemsCount: selectedRows.length,
            actions: selectedActions
          },
          "selected"
        ) : /* @__PURE__ */ jsx(
          DataTableHeader,
          {
            searchPlaceholder,
            searchValue: params2.query,
            onSearchChange: (query2) => setParams({ ...params2, query: query2 }),
            actions,
            filters,
            filtersLoading
          },
          "default"
        ) }),
        filters && /* @__PURE__ */ jsx("div", { className: "mb-14", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: filtersLoading && encodedFilters ? /* @__PURE__ */ jsx(FilterListSkeleton, {}) : /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsx(FilterList, { filters }) }, "filter-list") }) }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx(
              "relative rounded-panel",
              (!isMobile || !collapseTableOnMobile) && "border"
            ),
            children: [
              query.isFetching && /* @__PURE__ */ jsx(
                ProgressBar,
                {
                  isIndeterminate: true,
                  className: "absolute left-0 top-0 z-10 w-full",
                  "aria-label": trans({ message: "Loading" }),
                  size: "xs"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "relative overflow-x-auto md:overflow-hidden", children: /* @__PURE__ */ jsx(
                Table,
                {
                  ...tableDomProps,
                  columns,
                  data: (pagination == null ? void 0 : pagination.data) || [],
                  sortDescriptor: params2,
                  onSortChange: (descriptor) => {
                    setParams({ ...params2, ...descriptor });
                  },
                  selectedRows,
                  enableSelection,
                  selectionStyle,
                  onSelectionChange: setSelectedRows,
                  onAction: onRowAction,
                  collapseOnMobile: collapseTableOnMobile,
                  cellHeight
                }
              ) }),
              (query.isFetched || query.isPlaceholderData) && !(pagination == null ? void 0 : pagination.data.length) ? /* @__PURE__ */ jsx("div", { className: "pt-50", children: cloneElement(emptyStateMessage, {
                isFiltering
              }) }) : void 0,
              /* @__PURE__ */ jsx(
                DataTablePaginationFooter,
                {
                  query,
                  onPageChange: (page) => setParams({ ...params2, page }),
                  onPerPageChange: (perPage) => setParams({ ...params2, perPage })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function DataTablePage({
  title,
  headerContent,
  headerItemsAlign = "items-end",
  className,
  padding,
  ...dataTableProps
}) {
  const titleId = useId();
  return /* @__PURE__ */ jsxs("div", { className: clsx(padding ?? "p-12 md:p-24", className), children: [
    title && /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "mb-16",
          headerContent && `flex ${headerItemsAlign} gap-4`
        ),
        children: [
          /* @__PURE__ */ jsx(StaticPageTitle, { children: title }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-light first:capitalize", id: titleId, children: title }),
          headerContent
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      DataTable,
      {
        ...dataTableProps,
        tableDomProps: {
          "aria-labelledby": title ? titleId : void 0
        }
      }
    )
  ] });
}
function useDeleteSelectedRows() {
  const { endpoint: endpoint2, selectedRows, setSelectedRows } = useDataTable();
  return useMutation({
    mutationFn: () => deleteSelectedRows(endpoint2, selectedRows),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(endpoint2)
      });
      toast(
        message("Deleted [one 1 record|other :count records]", {
          values: { count: selectedRows.length }
        })
      );
      setSelectedRows([]);
    },
    onError: (err) => showHttpErrorToast(err, message("Could not delete records"))
  });
}
function deleteSelectedRows(endpoint2, ids) {
  return apiClient.delete(`${endpoint2}/${ids.join(",")}`).then((r) => r.data);
}
function DeleteSelectedItemsAction() {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Button, { variant: "flat", color: "danger", className: "ml-auto", children: /* @__PURE__ */ jsx(Trans, { message: "Delete" }) }),
    /* @__PURE__ */ jsx(DeleteItemsDialog, {})
  ] });
}
function DeleteItemsDialog() {
  const deleteSelectedRows2 = useDeleteSelectedRows();
  const { selectedRows, setSelectedRows } = useDataTable();
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isLoading: deleteSelectedRows2.isPending,
      title: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Delete [one 1 item|other :count items]?",
          values: { count: selectedRows.length }
        }
      ),
      body: /* @__PURE__ */ jsx(Trans, { message: "This will permanently remove the items and cannot be undone." }),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
      isDanger: true,
      onConfirm: () => {
        deleteSelectedRows2.mutate(void 0, {
          onSuccess: () => close(),
          onError: (err) => {
            if (errorStatusIs(err, 422)) {
              setSelectedRows([]);
              close();
            }
          }
        });
      }
    }
  );
}
function DataTableEmptyStateMessage({
  isFiltering,
  title,
  filteringTitle,
  image,
  size: size2,
  className
}) {
  const isMobile = useIsMobileMediaQuery();
  if (!size2) {
    size2 = isMobile ? "sm" : "md";
  }
  return /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      className,
      size: size2,
      image: /* @__PURE__ */ jsx(SvgImage, { src: image }),
      title: isFiltering && filteringTitle ? filteringTitle : title,
      description: isFiltering && filteringTitle ? /* @__PURE__ */ jsx(Trans, { message: "Try another search query or different filters" }) : void 0
    }
  );
}
const AddIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" }),
  "AddOutlined"
);
const DataTableAddItemButton = React.forwardRef(
  ({ children, to, elementType, onClick, href, download, icon, disabled }, ref) => {
    const isMobile = useIsMobileMediaQuery();
    if (isMobile) {
      return /* @__PURE__ */ jsx(
        IconButton,
        {
          ref,
          variant: "flat",
          color: "primary",
          className: "flex-shrink-0",
          size: "sm",
          to,
          href,
          download,
          elementType,
          onClick,
          disabled,
          children: icon || /* @__PURE__ */ jsx(AddIcon, {})
        }
      );
    }
    return /* @__PURE__ */ jsx(
      Button,
      {
        ref,
        startIcon: icon || /* @__PURE__ */ jsx(AddIcon, {}),
        variant: "flat",
        color: "primary",
        size: "sm",
        to,
        href,
        download,
        elementType,
        onClick,
        disabled,
        children
      }
    );
  }
);
const FileDownloadIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z" }),
  "FileDownloadOutlined"
);
function useExportCsv(endpoint2) {
  return useMutation({
    mutationFn: (payload) => exportCsv(endpoint2, payload),
    onError: (err) => showHttpErrorToast(err)
  });
}
function exportCsv(endpoint2, payload) {
  return apiClient.post(endpoint2, payload).then((r) => r.data);
}
function downloadFileFromUrl(url, name) {
  const link = document.createElement("a");
  link.href = url;
  if (name)
    link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function CsvExportInfoDialog() {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Csv export" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "Your request is being processed. We'll email you when the report is ready to download. In\n            certain cases, it might take a little longer, depending on the number of items beings\n            exported and the volume of activity."
      }
    ) }),
    /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", onClick: close, children: /* @__PURE__ */ jsx(Trans, { message: "Got it" }) }) })
  ] });
}
function DataTableExportCsvButton({
  endpoint: endpoint2,
  payload
}) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const exportCsv2 = useExportCsv(endpoint2);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        variant: "outline",
        color: "primary",
        size: "sm",
        className: "flex-shrink-0",
        disabled: exportCsv2.isPending,
        onClick: () => {
          exportCsv2.mutate(payload, {
            onSuccess: (response) => {
              if (response.downloadPath) {
                downloadFileFromUrl(response.downloadPath);
              } else {
                setDialogIsOpen(true);
              }
            }
          });
        },
        children: /* @__PURE__ */ jsx(FileDownloadIcon, {})
      }
    ),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        type: "modal",
        isOpen: dialogIsOpen,
        onOpenChange: setDialogIsOpen,
        children: /* @__PURE__ */ jsx(CsvExportInfoDialog, {})
      }
    )
  ] });
}
function NameWithAvatar({
  image,
  label,
  description,
  labelClassName,
  avatarSize = "md"
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
    image && /* @__PURE__ */ jsx(Avatar, { size: avatarSize, className: "flex-shrink-0", src: image }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(labelClassName, "overflow-hidden overflow-ellipsis"),
          children: label
        }
      ),
      description && /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis text-xs text-muted", children: description })
    ] })
  ] });
}
function useDatePickerState(props) {
  const now2 = useCurrentDateTime();
  const [isPlaceholder, setIsPlaceholder] = useState(
    !props.value && !props.defaultValue
  );
  const setStateValue = props.onChange;
  const [internalValue, setInternalValue] = useControlledState(
    props.value || now2,
    props.defaultValue || now2,
    (value) => {
      setIsPlaceholder(false);
      setStateValue == null ? void 0 : setStateValue(value);
    }
  );
  const {
    min,
    max,
    granularity,
    timezone,
    calendarIsOpen,
    setCalendarIsOpen,
    closeDialogOnSelection
  } = useBaseDatePickerState(internalValue, props);
  const clear = useCallback(() => {
    setIsPlaceholder(true);
    setInternalValue(now2);
    setStateValue == null ? void 0 : setStateValue(null);
    setCalendarIsOpen(false);
  }, [now2, setInternalValue, setStateValue, setCalendarIsOpen]);
  const [calendarDates, setCalendarDates] = useState(() => {
    return [toCalendarDate(internalValue)];
  });
  const setSelectedValue = useCallback(
    (newValue) => {
      if (min && newValue.compare(min) < 0) {
        newValue = min;
      } else if (max && newValue.compare(max) > 0) {
        newValue = max;
      }
      const value = internalValue ? internalValue.set(newValue) : toSafeZoned(newValue, timezone);
      setInternalValue(value);
      setCalendarDates([toCalendarDate(value)]);
      setIsPlaceholder(false);
    },
    [setInternalValue, min, max, internalValue, timezone]
  );
  const dayIsActive = useCallback(
    (day) => !isPlaceholder && isSameDay(internalValue, day),
    [internalValue, isPlaceholder]
  );
  const getCellProps = useCallback(
    (date) => {
      return {
        onClick: () => {
          setSelectedValue == null ? void 0 : setSelectedValue(date);
          if (closeDialogOnSelection) {
            setCalendarIsOpen == null ? void 0 : setCalendarIsOpen(false);
          }
        }
      };
    },
    [setSelectedValue, setCalendarIsOpen, closeDialogOnSelection]
  );
  return {
    selectedValue: internalValue,
    setSelectedValue: setInternalValue,
    calendarIsOpen,
    setCalendarIsOpen,
    dayIsActive,
    dayIsHighlighted: () => false,
    dayIsRangeStart: () => false,
    dayIsRangeEnd: () => false,
    getCellProps,
    calendarDates,
    setCalendarDates,
    isPlaceholder,
    clear,
    setIsPlaceholder,
    min,
    max,
    granularity,
    timezone,
    closeDialogOnSelection
  };
}
function DatePicker({ showCalendarFooter, ...props }) {
  const state = useDatePickerState(props);
  const inputRef = useRef(null);
  const now2 = useCurrentDateTime();
  const footer = showCalendarFooter && /* @__PURE__ */ jsx(
    DialogFooter,
    {
      padding: "px-14 pb-14",
      startAction: /* @__PURE__ */ jsx(
        Button,
        {
          disabled: state.isPlaceholder,
          variant: "text",
          color: "primary",
          onClick: () => {
            state.clear();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Clear" })
        }
      ),
      children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          color: "primary",
          onClick: () => {
            state.setSelectedValue(now2);
            state.setCalendarIsOpen(false);
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Today" })
        }
      )
    }
  );
  const dialog = /* @__PURE__ */ jsx(
    DialogTrigger,
    {
      offset: 8,
      placement: "bottom-start",
      isOpen: state.calendarIsOpen,
      onOpenChange: state.setCalendarIsOpen,
      type: "popover",
      triggerRef: inputRef,
      returnFocusToTrigger: false,
      moveFocusToDialog: false,
      children: /* @__PURE__ */ jsxs(Dialog, { size: "auto", children: [
        /* @__PURE__ */ jsx(
          DialogBody,
          {
            className: "flex items-start gap-40",
            padding: showCalendarFooter ? "px-24 pt-20 pb-10" : null,
            children: /* @__PURE__ */ jsx(Calendar, { state, visibleMonths: 1 })
          }
        ),
        footer
      ] })
    }
  );
  const openOnClick = {
    onClick: (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isHourSegment(e)) {
        state.setCalendarIsOpen(true);
      } else {
        state.setCalendarIsOpen(false);
      }
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      DatePickerField,
      {
        ref: inputRef,
        wrapperProps: openOnClick,
        endAdornment: /* @__PURE__ */ jsx(DateRangeIcon, { className: clsx(props.disabled && "text-disabled") }),
        ...props,
        children: /* @__PURE__ */ jsx(
          DateSegmentList,
          {
            segmentProps: openOnClick,
            state,
            value: state.selectedValue,
            onChange: state.setSelectedValue,
            isPlaceholder: state.isPlaceholder
          }
        )
      }
    ),
    dialog
  ] });
}
function FormDatePicker(props) {
  const { min, max } = props;
  const { trans } = useTrans();
  const { format } = useDateFormatter();
  const {
    field: { onChange, onBlur, value = null, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name,
    rules: {
      validate: (v) => {
        if (!v)
          return;
        const date = parseAbsoluteToLocal(v);
        if (min && date.compare(min) < 0) {
          return trans({
            message: "Enter a date after :date",
            values: { date: format(v) }
          });
        }
        if (max && date.compare(max) > 0) {
          return trans({
            message: "Enter a date before :date",
            values: { date: format(v) }
          });
        }
      }
    }
  });
  const parsedValue = value ? parseAbsoluteToLocal(value) : null;
  const formProps = {
    onChange: (e) => {
      onChange(e ? e.toAbsoluteString() : e);
    },
    onBlur,
    value: parsedValue,
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    inputRef: ref
  };
  return /* @__PURE__ */ jsx(DatePicker, { ...mergeProps(formProps, props) });
}
function isHourSegment(e) {
  return ["hour", "minute", "dayPeriod"].includes(
    e.currentTarget.ariaLabel || ""
  );
}
function chunkArray(array, chunkSize) {
  return array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
}
const ColorIcon = createSvgIcon(
  /* @__PURE__ */ jsx(
    "path",
    {
      stroke: "#E0E0E0",
      d: "M24,44c-7.168,0-13-5.816-13-12.971C11,24,24,4,24,4s13,20,13,27.029C37,38.184,31.168,44,24,44z"
    }
  )
);
function ColorSwatch({ onChange, value, colors }) {
  const presetButtons = colors.map((color) => {
    const isSelected = value === color;
    return /* @__PURE__ */ jsx(
      ButtonBase,
      {
        onClick: () => {
          onChange == null ? void 0 : onChange(color);
        },
        className: clsx(
          "relative block flex-shrink-0 w-26 h-26 border rounded",
          isSelected && "shadow-md"
        ),
        style: { backgroundColor: color },
        children: isSelected && /* @__PURE__ */ jsx("span", { className: "absolute inset-0 m-auto rounded-full w-8 h-8 bg-white" })
      },
      color
    );
  });
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-6", children: presetButtons });
}
const ColorPresets = [
  {
    color: "rgb(255, 255, 255)",
    name: message("White")
  },
  {
    color: "rgb(239,245,245)",
    name: message("Solitude")
  },
  {
    color: "rgb(245,213,174)",
    name: message("Wheat")
  },
  {
    color: "rgb(253,227,167)",
    name: message("Cape Honey")
  },
  {
    color: "rgb(242,222,186)",
    name: message("Milk punch")
  },
  {
    color: "rgb(97,118,75)",
    name: message("Dingy"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(4, 147, 114)",
    name: message("Aquamarine"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(222,245,229)",
    name: message("Cosmic Latte")
  },
  {
    color: "rgb(233,119,119)",
    name: message("Geraldine"),
    foreground: "rgb(90,14,14)"
  },
  {
    color: "rgb(247,164,164)",
    name: message("Sundown")
  },
  {
    color: "rgb(30,139,195)",
    name: message("Pelorous"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(142,68,173)",
    name: message("Deep Lilac"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(108,74,182)",
    name: message("Blue marguerite"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(139,126,116)",
    name: message("Americano"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(0,0,0)",
    name: message("Black"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(64,66,88)",
    name: message("Blue zodiac"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(101,100,124)",
    name: message("Comet"),
    foreground: "rgb(255, 255, 255)"
  }
];
const DefaultPresets = ColorPresets.map(({ color }) => color).slice(0, 14);
function ColorPicker({
  defaultValue,
  onChange,
  colorPresets,
  showInput
}) {
  const [color, setColor] = useState(defaultValue);
  const presets = colorPresets || DefaultPresets;
  const style = getInputFieldClassNames({ size: "sm" });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      HexColorPicker,
      {
        className: "!w-auto",
        color,
        onChange: (newColor) => {
          onChange == null ? void 0 : onChange(newColor);
          setColor(newColor);
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "py-20 px-12", children: [
      presets && /* @__PURE__ */ jsx(
        ColorSwatch,
        {
          colors: presets,
          onChange: (newColor) => {
            if (newColor) {
              const hex = parseColor(newColor).toString("hex");
              onChange == null ? void 0 : onChange(hex);
              setColor(hex);
            }
          },
          value: color
        }
      ),
      showInput && /* @__PURE__ */ jsx("div", { className: "pt-20", children: /* @__PURE__ */ jsx(
        HexColorInput,
        {
          autoComplete: "off",
          role: "textbox",
          autoCorrect: "off",
          spellCheck: "false",
          required: true,
          "aria-label": "Hex color",
          prefixed: true,
          className: style.input,
          color,
          onChange: (newColor) => {
            onChange == null ? void 0 : onChange(newColor);
            setColor(newColor);
          }
        }
      ) })
    ] })
  ] });
}
function ColorPickerDialog({
  hideFooter = false,
  showInput = true
}) {
  const { close, value, setValue, initialValue } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { size: "2xs", children: [
    /* @__PURE__ */ jsx(
      ColorPicker,
      {
        showInput,
        defaultValue: initialValue ? initialValue : "",
        onChange: (newValue) => setValue(newValue)
      }
    ),
    !hideFooter && /* @__PURE__ */ jsxs(DialogFooter, { dividerTop: true, children: [
      /* @__PURE__ */ jsx(Button, { variant: "text", size: "xs", onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          size: "xs",
          onClick: () => close(value),
          children: /* @__PURE__ */ jsx(Trans, { message: "Apply" })
        }
      )
    ] })
  ] });
}
const DragIndicatorIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" }),
  "DragIndicatorOutlined"
);
const DeleteIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" }),
  "DeleteOutlined"
);
const draggables = /* @__PURE__ */ new Map();
const droppables = /* @__PURE__ */ new Map();
const dragMonitors = /* @__PURE__ */ new Map();
const dragSession = {
  status: "inactive"
};
function interactableEvent({
  e,
  rect,
  deltaX,
  deltaY
}) {
  return {
    rect,
    x: e.clientX,
    y: e.clientY,
    deltaX: deltaX ?? 0,
    deltaY: deltaY ?? 0,
    nativeEvent: e
  };
}
let activeInteraction = null;
function setActiveInteraction(name) {
  activeInteraction = name;
}
function domRectToObj(rect) {
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height
  };
}
function updateRects(targets) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const { width, height, left, top } = entry.boundingClientRect;
      const [id, target] = [...targets].find(
        ([, target2]) => target2.ref.current === entry.target
      ) || [];
      if (id == null || target == null)
        return;
      const rect = {
        width,
        height,
        left,
        top
      };
      targets.set(id, { ...target, rect });
    });
    observer.disconnect();
  });
  [...targets.values()].forEach((target) => {
    if (target.ref.current) {
      observer.observe(target.ref.current);
    }
  });
}
function useDraggable({
  id,
  disabled,
  ref,
  preview,
  hidePreview,
  ...options
}) {
  const dragHandleRef = useRef(null);
  const { addGlobalListener, removeAllGlobalListeners } = useGlobalListeners();
  const state = useRef({
    lastPosition: { x: 0, y: 0 }
  }).current;
  const optionsRef = useRef(options);
  optionsRef.current = options;
  useLayoutEffect$1(() => {
    if (!disabled) {
      draggables.set(id, {
        ...draggables.get(id),
        id,
        ref,
        type: optionsRef.current.type,
        getData: optionsRef.current.getData
      });
    } else {
      draggables.delete(id);
    }
    return () => {
      draggables.delete(id);
    };
  }, [id, disabled, optionsRef, ref]);
  const notifyMonitors = (callback) => {
    dragMonitors.forEach((monitor) => {
      var _a2;
      if (monitor.type === ((_a2 = draggables.get(id)) == null ? void 0 : _a2.type)) {
        callback(monitor);
      }
    });
  };
  const onDragStart = (e) => {
    var _a2, _b2;
    const draggable = draggables.get(id);
    const el = ref.current;
    const clickedOnHandle = !dragHandleRef.current || !state.clickedEl || dragHandleRef.current.contains(state.clickedEl);
    if (activeInteraction || !el || !draggable || !clickedOnHandle) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    updateRects(droppables);
    setActiveInteraction("drag");
    if (hidePreview) {
      hideNativeGhostImage(e);
    }
    e.dataTransfer.effectAllowed = "move";
    state.lastPosition = { x: e.clientX, y: e.clientY };
    state.currentRect = domRectToObj(el.getBoundingClientRect());
    const ie = interactableEvent({ rect: state.currentRect, e });
    if (preview == null ? void 0 : preview.current) {
      preview.current(draggable, (node) => {
        e.dataTransfer.setDragImage(node, 0, 0);
      });
    }
    dragSession.status = "dragging";
    dragSession.dragTargetId = id;
    if (ref.current) {
      ref.current.dataset.dragging = "true";
    }
    (_b2 = (_a2 = optionsRef.current).onDragStart) == null ? void 0 : _b2.call(_a2, ie, draggable);
    requestAnimationFrame(() => {
      notifyMonitors((m2) => {
        var _a3;
        return (_a3 = m2.onDragStart) == null ? void 0 : _a3.call(m2, ie, draggable);
      });
    });
    addGlobalListener(window, "dragover", onDragOver, true);
  };
  const onDragOver = (e) => {
    var _a2, _b2;
    e.preventDefault();
    if (!state.currentRect)
      return;
    const deltaX = e.clientX - state.lastPosition.x;
    const deltaY = e.clientY - state.lastPosition.y;
    const newRect = {
      ...state.currentRect,
      left: state.currentRect.left + deltaX,
      top: state.currentRect.top + deltaY
    };
    const ie = interactableEvent({ rect: newRect, e, deltaX, deltaY });
    const target = draggables.get(id);
    if (target) {
      (_b2 = (_a2 = optionsRef.current).onDragMove) == null ? void 0 : _b2.call(_a2, ie, target);
      notifyMonitors((m2) => {
        var _a3;
        return (_a3 = m2.onDragMove) == null ? void 0 : _a3.call(m2, ie, target);
      });
    }
    state.lastPosition = { x: e.clientX, y: e.clientY };
    state.currentRect = newRect;
  };
  const onDragEnd = (e) => {
    var _a2, _b2;
    removeAllGlobalListeners();
    if (!state.currentRect)
      return;
    setActiveInteraction(null);
    if (emptyImage) {
      emptyImage.remove();
    }
    const ie = interactableEvent({ rect: state.currentRect, e });
    const draggable = draggables.get(id);
    if (draggable) {
      (_b2 = (_a2 = optionsRef.current).onDragEnd) == null ? void 0 : _b2.call(_a2, ie, draggable);
      notifyMonitors((m2) => {
        var _a3;
        return (_a3 = m2.onDragEnd) == null ? void 0 : _a3.call(m2, ie, draggable, dragSession.status);
      });
    }
    requestAnimationFrame(() => {
      dragSession.dragTargetId = void 0;
      dragSession.status = "inactive";
      if (ref.current) {
        delete ref.current.dataset.dragging;
      }
    });
  };
  const draggableProps = {
    draggable: !disabled,
    onDragStart,
    onDragEnd,
    onPointerDown: (e) => {
      state.clickedEl = e.target;
    }
  };
  return { draggableProps, dragHandleRef };
}
let emptyImage;
function hideNativeGhostImage(e) {
  if (!emptyImage) {
    emptyImage = new Image();
    document.body.append(emptyImage);
    emptyImage.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  }
  e.dataTransfer.setDragImage(emptyImage, 0, 0);
}
async function* readFilesFromDataTransfer(dataTransfer) {
  const entries = [];
  for (const item of dataTransfer.items) {
    if (item.kind === "file") {
      const entry = item.webkitGetAsEntry();
      if (entry) {
        entries.push(entry);
      }
    }
  }
  for (const entry of entries) {
    if (entry.isFile) {
      if (entry.name === ".DS_Store")
        continue;
      const file = await getEntryFile(entry);
      yield new UploadedFile(file, entry.fullPath);
    } else if (entry.isDirectory) {
      yield* getEntriesFromDirectory(entry);
    }
  }
}
async function* getEntriesFromDirectory(item) {
  const reader = item.createReader();
  let entries;
  do {
    entries = await new Promise((resolve, reject) => {
      reader.readEntries(resolve, reject);
    });
    for (const entry of entries) {
      if (entry.isFile) {
        if (entry.name === ".DS_Store")
          continue;
        const file = await getEntryFile(entry);
        yield new UploadedFile(file, entry.fullPath);
      } else if (entry.isDirectory) {
        yield* getEntriesFromDirectory(entry);
      }
    }
  } while (entries.length > 0);
}
function getEntryFile(entry) {
  return new Promise((resolve, reject) => entry.file(resolve, reject));
}
async function asyncIterableToArray(iterator) {
  const items = [];
  for await (const item of iterator) {
    items.push(item);
  }
  return items;
}
const DROP_ACTIVATE_TIMEOUT = 400;
function useDroppable({
  id,
  disabled,
  ref,
  ...options
}) {
  const state = useRef({
    dragOverElements: /* @__PURE__ */ new Set(),
    dropActivateTimer: void 0
  }).current;
  const optionsRef = useRef(options);
  optionsRef.current = options;
  useLayoutEffect$1(() => {
    droppables.set(id, {
      ...droppables.get(id),
      disabled,
      id,
      ref
    });
    return () => {
      droppables.delete(id);
    };
  }, [id, optionsRef, disabled, ref]);
  const canDrop = (draggable) => {
    var _a2;
    const options2 = optionsRef.current;
    const allowEventsOnSelf = options2.allowDragEventsFromItself || ref.current !== ((_a2 = draggable.ref) == null ? void 0 : _a2.current);
    return !!((draggable == null ? void 0 : draggable.type) && allowEventsOnSelf && options2.types.includes(draggable.type) && (!options2.acceptsDrop || options2.acceptsDrop(draggable)));
  };
  const fireDragLeave = (e) => {
    var _a2, _b2;
    const draggable = getDraggable(e);
    if (draggable) {
      (_b2 = (_a2 = optionsRef.current).onDragLeave) == null ? void 0 : _b2.call(_a2, draggable);
    }
  };
  const onDragEnter = (e) => {
    var _a2, _b2;
    e.stopPropagation();
    state.dragOverElements.add(e.target);
    if (state.dragOverElements.size > 1) {
      return;
    }
    const draggable = getDraggable(e);
    if (draggable && canDrop(draggable)) {
      (_b2 = (_a2 = optionsRef.current).onDragEnter) == null ? void 0 : _b2.call(_a2, draggable);
      clearTimeout(state.dropActivateTimer);
      if (typeof optionsRef.current.onDropActivate === "function") {
        state.dropActivateTimer = setTimeout(() => {
          var _a3, _b3;
          if (draggable) {
            (_b3 = (_a3 = optionsRef.current).onDropActivate) == null ? void 0 : _b3.call(_a3, draggable);
          }
        }, DROP_ACTIVATE_TIMEOUT);
      }
    }
  };
  const onDragLeave = (e) => {
    e.stopPropagation();
    state.dragOverElements.delete(e.target);
    for (const element of state.dragOverElements) {
      if (!e.currentTarget.contains(element)) {
        state.dragOverElements.delete(element);
      }
    }
    if (state.dragOverElements.size > 0) {
      return;
    }
    const draggable = getDraggable(e);
    if (draggable && canDrop(draggable)) {
      fireDragLeave(e);
      clearTimeout(state.dropActivateTimer);
    }
  };
  const onDrop = async (e) => {
    var _a2, _b2, _c, _d;
    e.preventDefault();
    e.stopPropagation();
    state.dragOverElements.clear();
    fireDragLeave(e);
    clearTimeout(state.dropActivateTimer);
    const draggable = getDraggable(e);
    if (draggable) {
      (_b2 = (_a2 = optionsRef.current).onDragLeave) == null ? void 0 : _b2.call(_a2, draggable);
      if (!canDrop(draggable)) {
        if (dragSession.status !== "inactive") {
          dragSession.status = "dropFail";
        }
      } else {
        const dropResult = (_d = (_c = optionsRef.current).onDrop) == null ? void 0 : _d.call(_c, draggable);
        if (dragSession.status !== "inactive") {
          dragSession.status = dropResult === false ? "dropFail" : "dropSuccess";
        }
      }
    }
  };
  const droppableProps = {
    onDragOver: (e) => {
      var _a2, _b2;
      e.preventDefault();
      e.stopPropagation();
      const draggable = getDraggable(e);
      if (draggable && canDrop(draggable)) {
        (_b2 = (_a2 = optionsRef.current).onDragOver) == null ? void 0 : _b2.call(_a2, draggable, e);
      }
    },
    onDragEnter,
    onDragLeave,
    onDrop
  };
  return {
    droppableProps: disabled ? {} : droppableProps
  };
}
function getDraggable(e) {
  if (dragSession.dragTargetId != null) {
    return draggables.get(dragSession.dragTargetId);
  } else if (e.dataTransfer.types.includes("Files")) {
    return {
      type: "nativeFile",
      el: null,
      ref: null,
      getData: () => {
        return asyncIterableToArray(readFilesFromDataTransfer(e.dataTransfer));
      }
    };
  }
}
const sortableLineStrategy = {
  onDragStart: () => {
  },
  onDragEnter: () => {
  },
  onDragOver: ({ e, ref, item, sortSession: sortSession2, onDropPositionChange }) => {
    var _a2;
    const previousPosition = sortSession2.dropPosition;
    let newPosition = null;
    const rect = (_a2 = droppables.get(item)) == null ? void 0 : _a2.rect;
    if (rect) {
      const midY = rect.top + rect.height / 2;
      if (e.clientY <= midY) {
        newPosition = "before";
      } else if (e.clientY >= midY) {
        newPosition = "after";
      }
    }
    if (newPosition !== previousPosition) {
      const overIndex = sortSession2.sortables.indexOf(item);
      sortSession2.dropPosition = newPosition;
      onDropPositionChange == null ? void 0 : onDropPositionChange(sortSession2.dropPosition);
      clearLinePreview(sortSession2);
      if (ref.current) {
        if (sortSession2.dropPosition === "after") {
          addLinePreview(ref.current, "bottom", sortSession2);
        } else {
          if (overIndex === 0) {
            addLinePreview(ref.current, "top", sortSession2);
          } else {
            const droppableId = sortSession2.sortables[overIndex - 1];
            const droppable = droppables.get(droppableId);
            if (droppable == null ? void 0 : droppable.ref.current) {
              addLinePreview(droppable.ref.current, "bottom", sortSession2);
            }
          }
        }
      }
      const itemIndex = sortSession2.sortables.indexOf(item);
      if (sortSession2.activeIndex === itemIndex) {
        sortSession2.finalIndex = sortSession2.activeIndex;
        return;
      }
      const dragDirection = overIndex > sortSession2.activeIndex ? "after" : "before";
      if (dragDirection === "after") {
        sortSession2.finalIndex = sortSession2.dropPosition === "before" ? itemIndex - 1 : itemIndex;
      } else {
        sortSession2.finalIndex = sortSession2.dropPosition === "after" ? itemIndex + 1 : itemIndex;
      }
    }
  },
  onDragEnd: (sortSession2) => {
    clearLinePreview(sortSession2);
  }
};
function clearLinePreview(sortSession2) {
  if (sortSession2 == null ? void 0 : sortSession2.linePreviewEl) {
    sortSession2.linePreviewEl.style.borderBottomColor = "";
    sortSession2.linePreviewEl.style.borderTopColor = "";
    sortSession2.linePreviewEl = void 0;
  }
}
function addLinePreview(el, side, sortSession2) {
  const color = "rgb(var(--be-primary))";
  if (side === "top") {
    el.style.borderTopColor = color;
  } else {
    el.style.borderBottomColor = color;
  }
  if (sortSession2) {
    sortSession2.linePreviewEl = el;
  }
}
function moveItemInArray(array, fromIndex, toIndex) {
  const from = clamp(fromIndex, 0, array.length - 1);
  const to = clamp(toIndex, 0, array.length - 1);
  if (from === to) {
    return array;
  }
  const target = array[from];
  const delta = to < from ? -1 : 1;
  for (let i = from; i !== to; i += delta) {
    array[i] = array[i + delta];
  }
  array[to] = target;
  return array;
}
function moveItemInNewArray(array, from, to) {
  const newArray = array.slice();
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0]
  );
  return newArray;
}
const transition = "transform 0.2s cubic-bezier(0.2, 0, 0, 1)";
const sortableTransformStrategy = {
  onDragStart: (sortSession2) => {
    sortSession2.sortables.forEach((sortable, index) => {
      const droppable = droppables.get(sortable);
      if (!(droppable == null ? void 0 : droppable.ref.current))
        return;
      droppable.ref.current.style.transition = transition;
      if ((sortSession2 == null ? void 0 : sortSession2.activeIndex) === index) {
        droppable.ref.current.style.opacity = "0.4";
      }
    });
  },
  onDragEnter: (sortSession2, overIndex, currentIndex) => {
    moveItemInArray(sortSession2.sortables, currentIndex, overIndex);
    const rects = sortSession2.sortables.map((s) => {
      var _a2;
      return (_a2 = droppables.get(s)) == null ? void 0 : _a2.rect;
    });
    sortSession2.sortables.forEach((sortable, index) => {
      if (!sortSession2)
        return;
      const newRects = moveItemInNewArray(
        rects,
        overIndex,
        sortSession2.activeIndex
      );
      const oldRect = rects[index];
      const newRect = newRects[index];
      const sortableTarget = droppables.get(sortable);
      if ((sortableTarget == null ? void 0 : sortableTarget.ref.current) && newRect && oldRect) {
        const x = newRect.left - oldRect.left;
        const y = newRect.top - oldRect.top;
        sortableTarget.ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    });
    sortSession2.finalIndex = overIndex;
  },
  onDragOver: () => {
  },
  onDragEnd: (sortSession2) => {
    sortSession2.sortables.forEach((sortable) => {
      const droppable = droppables.get(sortable);
      if (droppable == null ? void 0 : droppable.ref.current) {
        droppable.ref.current.style.transform = "";
        droppable.ref.current.style.transition = "";
        droppable.ref.current.style.opacity = "";
        droppable.ref.current.style.zIndex = "";
      }
    });
  }
};
const sortableMoveNodeStrategy = {
  onDragStart: () => {
  },
  onDragOver: () => {
  },
  onDragEnter: (sortSession2, overIndex, currentIndex) => {
    var _a2;
    const node = (_a2 = droppables.get(sortSession2.sortables[currentIndex])) == null ? void 0 : _a2.ref.current;
    if (node) {
      moveNode(node, currentIndex, overIndex);
      moveItemInArray(sortSession2.sortables, currentIndex, overIndex);
      sortSession2.finalIndex = overIndex;
    }
  },
  onDragEnd: () => {
  }
};
function moveNode(el, currentIndex, newIndex) {
  const parentEl = el.parentElement;
  if (newIndex < 0) {
    parentEl.prepend(el);
  } else {
    if (currentIndex > -1 && currentIndex <= newIndex) {
      newIndex++;
    }
    const ref = parentEl.children.item(newIndex);
    if (ref) {
      ref.before(el);
    } else {
      parentEl.append(el);
    }
  }
}
let sortSession = null;
const strategies = {
  line: sortableLineStrategy,
  liveSort: sortableTransformStrategy,
  moveNode: sortableMoveNodeStrategy
};
function useSortable({
  item,
  items,
  type,
  ref,
  onSortEnd,
  onSortStart,
  onDragEnd,
  preview,
  disabled,
  onDropPositionChange,
  strategy = "liveSort"
}) {
  useEffect(() => {
    if (sortSession && sortSession.sortables.length !== items.length) {
      sortSession.sortables = [...items];
      sortSession.activeIndex = items.indexOf(item);
    }
  }, [items, item]);
  const { draggableProps, dragHandleRef } = useDraggable({
    id: item,
    ref,
    type,
    preview,
    disabled,
    onDragStart: () => {
      var _a2;
      sortSession = {
        sortables: [...items],
        activeSortable: item,
        activeIndex: items.indexOf(item),
        finalIndex: items.indexOf(item),
        dropPosition: null,
        ref,
        scrollParent: ref.current ? getScrollParent(ref.current) : void 0,
        scrollListener: () => {
          updateRects(droppables);
        }
      };
      strategies[strategy].onDragStart(sortSession);
      onSortStart == null ? void 0 : onSortStart();
      (_a2 = sortSession.scrollParent) == null ? void 0 : _a2.addEventListener(
        "scroll",
        sortSession.scrollListener
      );
    },
    onDragEnd: () => {
      var _a2;
      if (!sortSession)
        return;
      sortSession.dropPosition = null;
      onDropPositionChange == null ? void 0 : onDropPositionChange(sortSession.dropPosition);
      if (sortSession.activeIndex !== sortSession.finalIndex) {
        onSortEnd == null ? void 0 : onSortEnd(sortSession.activeIndex, sortSession.finalIndex);
      }
      (_a2 = sortSession.scrollParent) == null ? void 0 : _a2.removeEventListener(
        "scroll",
        sortSession.scrollListener
      );
      strategies[strategy].onDragEnd(sortSession);
      onDragEnd == null ? void 0 : onDragEnd();
      sortSession = null;
    },
    getData: () => {
    }
  });
  const { droppableProps } = useDroppable({
    id: item,
    ref,
    types: [type],
    disabled,
    allowDragEventsFromItself: true,
    onDragOver: (target, e) => {
      if (!sortSession)
        return;
      strategies[strategy].onDragOver({
        e,
        ref,
        item,
        sortSession,
        onDropPositionChange
      });
    },
    onDragEnter: () => {
      if (!sortSession)
        return;
      const overIndex = sortSession.sortables.indexOf(item);
      const oldIndex = sortSession.sortables.indexOf(
        sortSession.activeSortable
      );
      strategies[strategy].onDragEnter(sortSession, overIndex, oldIndex);
    },
    onDragLeave: () => {
      if (!sortSession)
        return;
      sortSession.dropPosition = null;
      onDropPositionChange == null ? void 0 : onDropPositionChange(sortSession.dropPosition);
    }
  });
  return {
    sortableProps: { ...mergeProps(draggableProps, droppableProps) },
    dragHandleRef
  };
}
const AceEditor = React.lazy(() => import("./ace-editor-a259b9e0.mjs"));
function AceDialog({
  defaultValue,
  mode = "html",
  title,
  onSave,
  isSaving,
  footerStartAction,
  beautify,
  editorRef
}) {
  const [value, setValue] = useState(defaultValue);
  const [isValid, setIsValid] = useState(true);
  return /* @__PURE__ */ jsxs(Dialog, { size: "fullscreen", className: "h-full w-full", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: title }),
    /* @__PURE__ */ jsx(DialogBody, { className: "relative flex-auto", padding: "p-0", children: /* @__PURE__ */ jsx(
      Suspense,
      {
        fallback: /* @__PURE__ */ jsx("div", { className: "flex h-400 w-full items-center justify-center", children: /* @__PURE__ */ jsx(
          ProgressCircle,
          {
            "aria-label": "Loading editor...",
            isIndeterminate: true,
            size: "md"
          }
        ) }),
        children: /* @__PURE__ */ jsx(
          AceEditor,
          {
            beautify,
            mode,
            onChange: (newValue) => setValue(newValue),
            defaultValue: value || "",
            onIsValidChange: setIsValid,
            editorRef
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx(
      Footer,
      {
        disabled: !isValid || isSaving,
        value,
        onSave,
        startAction: footerStartAction
      }
    )
  ] });
}
function Footer({ disabled, value, onSave, startAction }) {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsxs(DialogFooter, { dividerTop: true, startAction, children: [
    /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
    /* @__PURE__ */ jsx(
      Button,
      {
        disabled,
        variant: "flat",
        color: "primary",
        onClick: () => {
          if (onSave) {
            onSave(value);
          } else {
            close(value);
          }
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
      }
    )
  ] });
}
const articlesSvg = "/assets/articles-8bfd9f17.svg";
const USER_MODEL = "user";
const CustomPageDatatableFilters = (config) => {
  const dynamicFilters = config.customPages.types.length > 1 ? [
    {
      control: {
        type: FilterControlType.Select,
        defaultValue: "default",
        options: config.customPages.types.map((type) => ({
          value: type.type,
          label: type.label,
          key: type.type
        }))
      },
      key: "type",
      label: message("Type"),
      description: message("Type of the page"),
      defaultOperator: FilterOperator.eq
    }
  ] : [];
  return [
    {
      key: "user_id",
      label: message("User"),
      description: message("User page was created by"),
      defaultOperator: FilterOperator.eq,
      control: {
        type: FilterControlType.SelectModel,
        model: USER_MODEL
      }
    },
    ...dynamicFilters,
    createdAtFilter({
      description: message("Date page was created")
    }),
    updatedAtFilter({
      description: message("Date page was last updated")
    })
  ];
};
const TuneIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" }),
  "TuneOutlined"
);
const MoreVertIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" }),
  "MoreVertOutlined"
);
function themeValueToHex(value) {
  try {
    return parseColor(`rgb(${value.split(" ").join(",")})`).toString("hex");
  } catch (e) {
    return value;
  }
}
const TabContext = React.createContext(null);
function Tabs(props) {
  const {
    size: size2 = "md",
    children,
    className,
    isLazy,
    overflow = "overflow-hidden"
  } = props;
  const tabsRef = useRef([]);
  const id = useId();
  const [selectedTab, setSelectedTab] = useControlledState(
    props.selectedTab,
    props.defaultSelectedTab || 0,
    props.onTabChange
  );
  const ContextValue = useMemo(() => {
    return {
      selectedTab,
      setSelectedTab,
      tabsRef,
      size: size2,
      isLazy,
      id
    };
  }, [selectedTab, id, isLazy, setSelectedTab, size2]);
  return /* @__PURE__ */ jsx(TabContext.Provider, { value: ContextValue, children: /* @__PURE__ */ jsx("div", { className: clsx(className, overflow, "max-w-full"), children }) });
}
function TabLine() {
  const { tabsRef, selectedTab } = useContext(TabContext);
  const [style, setStyle] = useState({
    width: void 0,
    transform: void 0,
    className: void 0
  });
  useLayoutEffect(() => {
    if (selectedTab != null && tabsRef.current) {
      const el = tabsRef.current[selectedTab];
      if (!el)
        return;
      setStyle((prevState) => {
        return {
          width: `${el.offsetWidth}px`,
          transform: `translateX(${el.offsetLeft}px)`,
          // disable initial transition for tabline
          className: prevState.width === void 0 ? "" : "transition-all"
        };
      });
    }
  }, [setStyle, selectedTab, tabsRef]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "absolute bottom-0 left-0 h-2 bg-primary",
        style.className
      ),
      role: "presentation",
      style: { width: style.width, transform: style.transform }
    }
  );
}
function TabList({ children, center, expand, className }) {
  const childrenArray = Children.toArray(children);
  return /* @__PURE__ */ jsx(FocusScope, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        // hide scrollbar completely on mobile, show compact one on desktop
        "flex relative max-w-full overflow-auto border-b max-sm:hidden-scrollbar md:compact-scrollbar",
        className
      ),
      role: "tablist",
      "aria-orientation": "horizontal",
      children: [
        childrenArray.map((child, index) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              index,
              className: clsx(
                child.props.className,
                expand && "flex-auto",
                center && index === 0 && "ml-auto",
                center && index === childrenArray.length - 1 && "mr-auto"
              )
            });
          }
          return null;
        }),
        /* @__PURE__ */ jsx(TabLine, {})
      ]
    }
  ) });
}
function Tab({
  index,
  className,
  isDisabled,
  children,
  padding: paddingProp,
  elementType = "button",
  to,
  relative,
  width = "min-w-min"
}) {
  const {
    selectedTab,
    setSelectedTab,
    tabsRef,
    size: size2 = "md",
    id
  } = useContext(TabContext);
  const isSelected = index === selectedTab;
  const focusManager = useFocusManager();
  const padding = paddingProp || (size2 === "sm" ? "px-12" : "px-18");
  const mergedClassname = clsx(
    "tracking-wide overflow-hidden capitalize text-sm flex items-center justify-center outline-none transition-colors",
    "focus-visible:ring focus-visible:ring-2 ring-inset rounded whitespace-nowrap cursor-pointer",
    width,
    textColor({ isDisabled, isSelected }),
    className,
    size2 === "md" && `${padding} h-48`,
    size2 === "sm" && `${padding} h-32`,
    isDisabled && "pointer-events-none"
  );
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        focusManager == null ? void 0 : focusManager.focusPrevious();
        break;
      case "ArrowRight":
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "Home":
        focusManager == null ? void 0 : focusManager.focusFirst();
        break;
      case "End":
        focusManager == null ? void 0 : focusManager.focusLast();
        break;
    }
  };
  const tabIndex = isSelected ? 0 : -1;
  const Element = elementType;
  return /* @__PURE__ */ jsx(
    Element,
    {
      disabled: isDisabled,
      id: `${id}-${index}-tab`,
      "aria-controls": `${id}-${index}-tabpanel`,
      type: "button",
      role: "tab",
      "aria-selected": isSelected,
      tabIndex: isDisabled ? void 0 : tabIndex,
      onKeyDown,
      onClick: () => {
        setSelectedTab(index);
      },
      to,
      relative,
      className: mergedClassname,
      ref: (el) => {
        if (tabsRef.current && el) {
          tabsRef.current[index] = el;
        }
      },
      children
    }
  );
}
function textColor({ isDisabled, isSelected }) {
  if (isDisabled) {
    return "text-disabled cursor-default";
  }
  if (isSelected) {
    return "text-primary";
  }
  return "text-muted hover:text-main";
}
function TabPanels({ children, className }) {
  const { selectedTab, isLazy } = useContext(TabContext);
  const panelArray = Children.toArray(children).filter((p) => !!p);
  let rendered;
  if (isLazy) {
    const el = panelArray[selectedTab];
    rendered = isValidElement(el) ? cloneElement(panelArray[selectedTab], {
      index: selectedTab
    }) : null;
  } else {
    rendered = panelArray.map((panel, index) => {
      if (isValidElement(panel)) {
        const isSelected = index === selectedTab;
        return cloneElement(panel, {
          index,
          "aria-hidden": !isSelected,
          className: !isSelected ? clsx(panel.props.className, "hidden") : panel.props.className
        });
      }
      return null;
    });
  }
  return /* @__PURE__ */ jsx("div", { className, children: rendered });
}
function TabPanel({
  className,
  children,
  index,
  ...domProps
}) {
  const { id } = useContext(TabContext);
  const [tabIndex, setTabIndex] = useState(0);
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (ref == null ? void 0 : ref.current) {
      const update = () => {
        const walker = getFocusableTreeWalker(ref.current, { tabbable: true });
        setTabIndex(walker.nextNode() ? void 0 : 0);
      };
      update();
      const observer = new MutationObserver(update);
      observer.observe(ref.current, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["tabIndex", "disabled"]
      });
      return () => {
        observer.disconnect();
      };
    }
  }, [ref]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      tabIndex,
      ref,
      id: `${id}-${index}-tabpanel`,
      "aria-labelledby": `${id}-${index}-tab`,
      className: clsx(className, "focus-visible:outline-primary-light"),
      role: "tabpanel",
      ...domProps,
      children
    }
  );
}
function useStickySentinel() {
  const [isSticky, setIsSticky] = useState(false);
  const observerRef = useRef();
  const sentinelRef = useCallback((sentinel) => {
    var _a2;
    if (sentinel) {
      const observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        { threshold: [1] }
      );
      observerRef.current = observer;
      observer.observe(sentinel);
    } else if (observerRef.current) {
      (_a2 = observerRef.current) == null ? void 0 : _a2.disconnect();
    }
  }, []);
  return { isSticky, sentinelRef };
}
function slugifyString(text, replacement = "-", strict = false) {
  if (!text)
    return text;
  let slugified = slugify(text, {
    lower: true,
    replacement,
    strict,
    remove: /[*+~.()'"!:@?\|/\\#]/g
  });
  if (!slugified) {
    slugified = text.replace(/\s+/g, "-").toLowerCase();
  }
  return slugified;
}
function useCreateWorkspace(form) {
  return useMutation({
    mutationFn: (props) => createWorkspace(props),
    onSuccess: () => {
      toast(message("Created workspace"));
      queryClient.invalidateQueries({
        queryKey: WorkspaceQueryKeys.fetchUserWorkspaces
      });
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function createWorkspace(props) {
  return apiClient.post("workspace", props).then((r) => r.data);
}
function NewWorkspaceDialog() {
  const form = useForm();
  const { formId, close } = useDialogContext();
  const createWorkspace2 = useCreateWorkspace(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Create workspace" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        form,
        id: formId,
        onSubmit: () => {
          createWorkspace2.mutate(form.getValues(), {
            onSuccess: (response) => {
              close(response.workspace.id);
            }
          });
        },
        children: /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "name",
            autoFocus: true,
            label: /* @__PURE__ */ jsx(Trans, { message: "Workspace name" }),
            minLength: 3,
            required: true
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "text", onClick: close, children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: createWorkspace2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Create" })
        }
      )
    ] })
  ] });
}
function fetchWorkspaceWithMembers(workspaceId) {
  return apiClient.get(`workspace/${workspaceId}`).then((response) => response.data);
}
function useWorkspaceWithMembers(workspaceId) {
  return useQuery({
    queryKey: WorkspaceQueryKeys.workspaceWithMembers(workspaceId),
    queryFn: () => fetchWorkspaceWithMembers(workspaceId)
  });
}
const GroupIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z" }),
  "GroupOutlined"
);
function InviteMembers({ workspaceId, ...other }) {
  return apiClient.post(`workspace/${workspaceId}/invite`, other).then((r) => r.data);
}
function useInviteMembers() {
  return useMutation({
    mutationFn: (props) => InviteMembers(props),
    onSuccess: (response, props) => {
      queryClient.invalidateQueries({
        queryKey: WorkspaceQueryKeys.workspaceWithMembers(props.workspaceId)
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function ResendInvite({
  workspaceId,
  inviteId,
  ...other
}) {
  return apiClient.post(`workspace/${workspaceId}/${inviteId}/resend`, other).then((r) => r.data);
}
function useResendInvite() {
  return useMutation({
    mutationFn: (props) => ResendInvite(props),
    onSuccess: () => {
      toast("Invite sent");
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
const matcher = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
function isEmail(string) {
  if (!string)
    return false;
  if (string.length > 320)
    return false;
  return matcher.test(string);
}
function ChangeRole({ workspaceId, member, ...other }) {
  const modelType = member.model_type;
  const memberId = member.model_type === "invite" ? member.id : member.member_id;
  return apiClient.post(
    `workspace/${workspaceId}/${modelType}/${memberId}/change-role`,
    other
  ).then((r) => r.data);
}
function useChangeRole() {
  return useMutation({
    mutationFn: (props) => ChangeRole(props),
    onSuccess: (response, props) => {
      toast(message("Role changed"));
      queryClient.invalidateQueries({
        queryKey: WorkspaceQueryKeys.workspaceWithMembers(props.workspaceId)
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function removeMember({
  workspaceId,
  memberId,
  memberType
}) {
  const endpoint2 = memberType === "invite" ? `workspace/invite/${memberId}` : `workspace/${workspaceId}/member/${memberId}`;
  return apiClient.delete(endpoint2).then((r) => r.data);
}
function useRemoveMember() {
  const { workspaceId, setWorkspaceId } = useActiveWorkspaceId();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (props) => removeMember(props),
    onSuccess: (response, props) => {
      queryClient.invalidateQueries({
        queryKey: WorkspaceQueryKeys.fetchUserWorkspaces
      });
      queryClient.invalidateQueries({
        queryKey: WorkspaceQueryKeys.workspaceWithMembers(props.workspaceId)
      });
      if (props.memberId === (user == null ? void 0 : user.id) && workspaceId === props.workspaceId) {
        setWorkspaceId(PersonalWorkspace.id);
      }
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function LeaveWorkspaceConfirmation({ onConfirm, isLoading }) {
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isDanger: true,
      title: /* @__PURE__ */ jsx(Trans, { message: "Leave workspace" }),
      isLoading,
      onConfirm,
      body: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to leave this workspace?" }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "All resources you've created in the workspace will be transferred to workspace owner." }) })
      ] }),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Leave" })
    }
  );
}
function WorkspaceMembersDialog({
  workspace
}) {
  const { data, isLoading } = useWorkspaceWithMembers(workspace.id);
  return /* @__PURE__ */ jsxs(Dialog, { size: "lg", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Manage workspace members" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: isLoading ? /* @__PURE__ */ jsx("div", { className: "flex min-h-[238px] items-center justify-center", children: /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, "aria-label": "Loading workspace..." }) }) : /* @__PURE__ */ jsx(Manager, { workspace: data.workspace }) })
  ] });
}
function Manager({ workspace }) {
  const { user } = useAuth();
  const can = usePermissions(workspace);
  const members = [
    ...workspace.members || [],
    ...workspace.invites || []
  ];
  const shouldHideOtherMembers = !can.update && !can.delete;
  return /* @__PURE__ */ jsxs("div", { children: [
    can.invite && /* @__PURE__ */ jsx(InviteChipField, { workspace }),
    /* @__PURE__ */ jsxs("div", { className: "mb-14 flex items-center gap-10 text-base", children: [
      /* @__PURE__ */ jsx(GroupIcon, { className: "icon-sm" }),
      /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Members of `:workspace`",
          values: { workspace: workspace.name }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(AnimatePresence, { initial: false, children: [
      members.map((member) => {
        if (shouldHideOtherMembers && member.id !== (user == null ? void 0 : user.id)) {
          return null;
        }
        return /* @__PURE__ */ jsx(
          MemberListItem,
          {
            workspace,
            member
          },
          `${member.model_type}.${member.id}`
        );
      }),
      shouldHideOtherMembers && /* @__PURE__ */ jsx("div", { className: "text-muted", children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "And [one one other member|:count other members]",
          values: { count: members.length }
        }
      ) })
    ] })
  ] });
}
function MemberListItem({ workspace, member }) {
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      initial: { x: "-100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "100%", opacity: 0 },
      transition: { type: "tween", duration: 0.125 },
      className: "mb-20 flex items-start gap-14 text-sm",
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "h-36 w-36 flex-shrink-0 rounded",
            src: member.avatar,
            alt: ""
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-auto items-center justify-between gap-14 md:flex", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-10 overflow-hidden md:mb-0 md:mr-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start gap-6", children: [
              /* @__PURE__ */ jsx("div", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: member.display_name }),
              /* @__PURE__ */ jsx(MemberDisplayNameAppend, { workspace, member })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-muted", children: member.email })
          ] }),
          /* @__PURE__ */ jsx(MemberActions, { workspace, member })
        ] })
      ]
    },
    `${member.model_type}.${member.id}`
  );
}
function usePermissions(workspace) {
  var _a2;
  const { user: authUser } = useAuth();
  const response = { update: false, invite: false, delete: false };
  const permissions = ["update", "invite", "delete"];
  const authMember = (_a2 = workspace.members) == null ? void 0 : _a2.find((mb) => mb.id === (authUser == null ? void 0 : authUser.id));
  if (authMember) {
    permissions.forEach((permission) => {
      var _a3;
      response[permission] = authMember.is_owner || !!((_a3 = authMember.permissions) == null ? void 0 : _a3.find(
        (p) => p.name === `workspace_members.${permission}`
      ));
    });
  }
  return response;
}
function MemberActions({ workspace, member }) {
  const [selectedRole, setSelectedRole] = useState(member.role_id);
  const changeRole = useChangeRole();
  const { user } = useAuth();
  const can = usePermissions(workspace);
  const isOwner = member.model_type === "member" && member.is_owner;
  const isCurrentUser = member.model_type === "member" && (user == null ? void 0 : user.id) === member.id;
  const roleSelector = !can.update || isOwner || isCurrentUser ? /* @__PURE__ */ jsx("div", { className: "ml-auto text-muted first:capitalize", children: /* @__PURE__ */ jsx(Trans, { message: member.role_name }) }) : /* @__PURE__ */ jsx(
    RoleMenuTrigger,
    {
      className: "ml-auto flex-shrink-0",
      size: "xs",
      value: selectedRole,
      isDisabled: changeRole.isPending,
      onChange: (roleId) => {
        setSelectedRole(roleId);
        changeRole.mutate({
          roleId,
          workspaceId: workspace.id,
          member
        });
      }
    }
  );
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    roleSelector,
    !isOwner && (isCurrentUser || can.delete) && /* @__PURE__ */ jsx(
      RemoveMemberButton,
      {
        type: isCurrentUser ? "leave" : "remove",
        member,
        workspace
      }
    )
  ] });
}
function InviteChipField({ workspace }) {
  const { trans } = useTrans();
  const [chips, setChips] = useState([]);
  const allEmailsValid = chips.every((chip) => !chip.invalid);
  const displayWith = (chip) => chip.description || chip.name;
  const [selectedRole, setSelectedRole] = useState();
  const inviteMembers = useInviteMembers();
  const { data } = useValueLists(["workspaceRoles"]);
  useEffect(() => {
    var _a2;
    if (!selectedRole && ((_a2 = data == null ? void 0 : data.workspaceRoles) == null ? void 0 : _a2.length)) {
      setSelectedRole(data.workspaceRoles[0].id);
    }
  }, [data, selectedRole]);
  return /* @__PURE__ */ jsxs("div", { className: "mb-30", children: [
    /* @__PURE__ */ jsx(
      ChipField,
      {
        value: chips,
        onChange: setChips,
        displayWith,
        validateWith: (chip) => {
          const invalid = !isEmail(chip.description);
          return {
            ...chip,
            invalid,
            errorMessage: invalid ? trans({ message: "Not a valid email" }) : void 0
          };
        },
        placeholder: trans({ message: "Enter email addresses" }),
        label: /* @__PURE__ */ jsx(Trans, { message: "Invite people" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-14 flex items-center justify-between gap-14", children: [
      /* @__PURE__ */ jsx(RoleMenuTrigger, { onChange: setSelectedRole, value: selectedRole }),
      chips.length && selectedRole ? /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          size: "sm",
          disabled: inviteMembers.isPending || !allEmailsValid,
          onClick: () => {
            inviteMembers.mutate(
              {
                emails: chips.map((c) => displayWith(c)),
                roleId: selectedRole,
                workspaceId: workspace.id
              },
              {
                onSuccess: () => {
                  setChips([]);
                }
              }
            );
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Invite" })
        }
      ) : null
    ] })
  ] });
}
function RemoveMemberButton({
  member,
  workspace,
  type
}) {
  const removeMember2 = useRemoveMember();
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (isConfirmed) => {
        if (isConfirmed) {
          removeMember2.mutate({
            workspaceId: workspace.id,
            memberId: member.id,
            memberType: member.model_type
          });
          if (type === "leave") {
            close();
            toast(message("Left workspace"));
          }
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "md",
            className: "flex-shrink-0 text-muted",
            disabled: removeMember2.isPending,
            children: type === "leave" ? /* @__PURE__ */ jsx(ExitToAppIcon, {}) : /* @__PURE__ */ jsx(CloseIcon, {})
          }
        ),
        type === "leave" ? /* @__PURE__ */ jsx(LeaveWorkspaceConfirmation, {}) : /* @__PURE__ */ jsx(RemoveMemberConfirmation, { member })
      ]
    }
  );
}
function RemoveMemberConfirmation({ member }) {
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isDanger: true,
      title: /* @__PURE__ */ jsx(Trans, { message: "Remove member" }),
      body: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Are you sure you want to remove `:name`?",
            values: { name: member.display_name }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-8 font-semibold", children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "All workspace resources created by `:name` will be transferred to workspace owner.",
            values: {
              name: member.display_name
            }
          }
        ) })
      ] }),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Remove" })
    }
  );
}
function RoleMenuTrigger({
  value,
  onChange,
  size: size2 = "xs",
  className,
  isDisabled
}) {
  var _a2;
  const { data } = useValueLists(["workspaceRoles"]);
  const role = (_a2 = data == null ? void 0 : data.workspaceRoles) == null ? void 0 : _a2.find((r) => r.id === value);
  if (!value || !role || !(data == null ? void 0 : data.workspaceRoles))
    return null;
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      selectionMode: "single",
      selectedValue: value,
      onSelectionChange: (newValue) => {
        onChange(newValue);
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            className,
            size: size2,
            variant: "flat",
            color: "chip",
            disabled: isDisabled,
            endIcon: /* @__PURE__ */ jsx(ArrowDropDownIcon, {}),
            children: /* @__PURE__ */ jsx(Trans, { message: role.name })
          }
        ),
        /* @__PURE__ */ jsx(Menu, { children: data.workspaceRoles.map((r) => /* @__PURE__ */ jsx(Item, { value: r.id, description: r.description, children: /* @__PURE__ */ jsx(Trans, { message: r.name }) }, r.id)) })
      ]
    }
  );
}
function MemberDisplayNameAppend({
  member,
  workspace
}) {
  const { user } = useAuth();
  const can = usePermissions(workspace);
  if ((user == null ? void 0 : user.id) === member.id) {
    return /* @__PURE__ */ jsxs("div", { className: "font-medium", children: [
      "(",
      /* @__PURE__ */ jsx(Trans, { message: "You" }),
      ")"
    ] });
  }
  if (member.model_type === "invite") {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { children: "·" }),
      /* @__PURE__ */ jsx("div", { className: "font-medium", children: /* @__PURE__ */ jsx(Trans, { message: "Invited" }) }),
      can.invite ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx("div", { children: "·" }),
        /* @__PURE__ */ jsx(ResendInviteDialogTrigger, { member, workspace })
      ] }) : null
    ] });
  }
  return null;
}
function ResendInviteDialogTrigger({
  member,
  workspace
}) {
  const resendInvite = useResendInvite();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (isConfirmed) => {
        if (isConfirmed) {
          resendInvite.mutate({
            workspaceId: workspace.id,
            inviteId: member.id
          });
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "link",
            size: "sm",
            color: "primary",
            disabled: resendInvite.isPending,
            children: /* @__PURE__ */ jsx(Trans, { message: "Resend invite" })
          }
        ),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            title: /* @__PURE__ */ jsx(Trans, { message: "Resend invite" }),
            body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to send this invite again?" }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Send" })
          }
        )
      ]
    }
  );
}
const PersonAddIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z" }),
  "PersonAddOutlined"
);
function updateWorkspace({
  id,
  ...props
}) {
  return apiClient.put(`workspace/${id}`, props).then((r) => r.data);
}
function useUpdateWorkspace(form) {
  const { close } = useDialogContext();
  return useMutation({
    mutationFn: (props) => updateWorkspace(props),
    onSuccess: (response) => {
      close();
      toast(message("Updated workspace"));
      queryClient.invalidateQueries({
        queryKey: WorkspaceQueryKeys.fetchUserWorkspaces
      });
      queryClient.invalidateQueries({
        queryKey: WorkspaceQueryKeys.workspaceWithMembers(
          response.workspace.id
        )
      });
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function RenameWorkspaceDialog({ workspace }) {
  const form = useForm({
    defaultValues: { id: workspace.id, name: workspace.name }
  });
  const { formId, close } = useDialogContext();
  const updateWorkspace2 = useUpdateWorkspace(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Rename workspace" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        form,
        id: formId,
        onSubmit: () => {
          updateWorkspace2.mutate(form.getValues());
        },
        children: /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "name",
            autoFocus: true,
            label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
            minLength: 3,
            required: true
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "text", onClick: close, children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: updateWorkspace2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Rename" })
        }
      )
    ] })
  ] });
}
function deleteWorkspace({ id }) {
  return apiClient.delete(`workspace/${id}`).then((r) => r.data);
}
function useDeleteWorkspace() {
  const { workspaceId, setWorkspaceId } = useActiveWorkspaceId();
  return useMutation({
    mutationFn: (props) => deleteWorkspace(props),
    onSuccess: (r, payload) => {
      toast(message("Deleted workspace"));
      queryClient.invalidateQueries({
        queryKey: WorkspaceQueryKeys.fetchUserWorkspaces
      });
      queryClient.invalidateQueries({
        queryKey: WorkspaceQueryKeys.workspaceWithMembers(payload.id)
      });
      if (workspaceId === payload.id) {
        setWorkspaceId(PersonalWorkspace.id);
      }
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function PolicyFailMessage({
  resourceName,
  className,
  size: size2 = "md",
  color = "bgAlt",
  reason = "overQuota",
  ...other
}) {
  const message2 = other.message ?? /* @__PURE__ */ jsx(MessageText, { resourceName, reason });
  return /* @__PURE__ */ jsx(
    SectionHelper,
    {
      color,
      size: size2,
      className,
      description: message2
    }
  );
}
function MessageText({ resourceName, reason }) {
  const { billing } = useSettings();
  if (reason === "noWorkspacePermission") {
    return /* @__PURE__ */ jsx(
      Trans,
      {
        message: "You can't create new :name in this workspace.",
        values: { name: resourceName }
      }
    );
  }
  const upgradeMsgValues = {
    name: resourceName,
    a: (text) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/pricing", children: text })
  };
  if (reason === "overQuota" && billing.enable) {
    return /* @__PURE__ */ jsx(
      Trans,
      {
        message: "Your plan is at its maximum number of :name allowed. <a>Upgrade to add more.</a>",
        values: upgradeMsgValues
      }
    );
  }
  if (reason === "noPermission" && billing.enable) {
    return /* @__PURE__ */ jsx(
      Trans,
      {
        message: "To unlock ability to create :name. <a>Upgrade your plan.</a>",
        values: upgradeMsgValues
      }
    );
  }
  return /* @__PURE__ */ jsx(Trans, { message: "You don't have permissions to create :name." });
}
function WorkspaceSelector({
  onChange,
  className,
  trigger,
  placement = "top"
}) {
  const { data: workspaces, isFetched, isFetching } = useUserWorkspaces();
  const { setWorkspaceId } = useActiveWorkspaceId();
  const activeWorkspace = useActiveWorkspace();
  const [selectorIsOpen, setSelectorIsOpen] = useState(false);
  const { hasPermission } = useAuth();
  useEffect(() => {
    if (isFetched && !isFetching && !activeWorkspace) {
      setWorkspaceId(PersonalWorkspace.id);
    }
  }, [activeWorkspace, workspaces, setWorkspaceId, isFetched, isFetching]);
  if (
    // if we have a custom trigger, leave rendering up to the customer trigger
    !trigger && (!activeWorkspace || !hasPermission("workspaces.create") && (workspaces == null ? void 0 : workspaces.length) === 1)
  ) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "popover",
      placement,
      isOpen: selectorIsOpen,
      onClose: () => {
        setSelectorIsOpen(false);
      },
      children: [
        trigger ? cloneElement(trigger, {
          onClick: () => setSelectorIsOpen(!selectorIsOpen)
        }) : /* @__PURE__ */ jsx(
          DefaultTrigger,
          {
            onClick: () => setSelectorIsOpen(!selectorIsOpen),
            workspace: activeWorkspace,
            className
          }
        ),
        /* @__PURE__ */ jsx(Dialog, { size: "min-w-320", children: /* @__PURE__ */ jsxs(DialogBody, { padding: "p-10", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-16 border-b pb-10", children: workspaces == null ? void 0 : workspaces.map((workspace) => /* @__PURE__ */ jsx(
            WorkspaceItem,
            {
              workspace,
              setSelectorIsOpen,
              onChange
            },
            workspace.id
          )) }),
          /* @__PURE__ */ jsx("div", { className: "mb-4 px-4 text-center", children: /* @__PURE__ */ jsx(
            CreateWorkspaceButton,
            {
              onClick: () => setSelectorIsOpen(false),
              onCreated: (id) => onChange == null ? void 0 : onChange(id),
              workspaceCount: workspaces ? workspaces.length - 1 : 0
            }
          ) })
        ] }) })
      ]
    }
  ) });
}
function CreateWorkspaceButton({
  onClick,
  onCreated,
  workspaceCount
}) {
  const { setWorkspaceId } = useActiveWorkspaceId();
  const { checkOverQuotaOrNoPermission } = useAuth();
  const { overQuotaOrNoPermission } = checkOverQuotaOrNoPermission(
    "workspaces.create",
    "count",
    workspaceCount
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        disabled: overQuotaOrNoPermission,
        onClick: async (e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
          const workspaceId = await openDialog(NewWorkspaceDialog);
          if (workspaceId) {
            setWorkspaceId(workspaceId);
            onCreated == null ? void 0 : onCreated(workspaceId);
          }
        },
        variant: "outline",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        color: "primary",
        className: "h-40 w-full",
        children: /* @__PURE__ */ jsx(Trans, { message: "Create new workspace" })
      }
    ),
    overQuotaOrNoPermission && /* @__PURE__ */ jsx(
      PolicyFailMessage,
      {
        size: "sm",
        className: "mt-12 max-w-288",
        resourceName: /* @__PURE__ */ jsx(Trans, { message: "worksapces" })
      }
    )
  ] });
}
const DefaultTrigger = forwardRef(
  ({ workspace, className, onClick, ...other }, ref) => {
    return /* @__PURE__ */ jsxs(
      ButtonBase,
      {
        ref,
        onClick,
        className: clsx(
          "flex items-center gap-10 rounded ring-inset hover:bg-hover focus-visible:ring-2",
          className
        ),
        ...other,
        children: [
          /* @__PURE__ */ jsxs("span", { className: "mr-auto block flex-auto overflow-hidden text-left", children: [
            /* @__PURE__ */ jsx("span", { className: "block overflow-hidden overflow-ellipsis text-sm font-medium text-main", children: workspace.default ? /* @__PURE__ */ jsx(Trans, { message: workspace.name }) : workspace.name }),
            /* @__PURE__ */ jsx("span", { className: "block text-xs text-muted", children: workspace.default ? /* @__PURE__ */ jsx(Trans, { message: "Personal workspace" }) : /* @__PURE__ */ jsx(
              Trans,
              {
                message: ":count members",
                values: { count: workspace.members_count }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(UnfoldMoreIcon, { className: "shrink-0 icon-md" })
        ]
      }
    );
  }
);
function WorkspaceItem({
  workspace,
  onChange,
  setSelectorIsOpen
}) {
  const { workspaceId, setWorkspaceId } = useActiveWorkspaceId();
  const isActive = workspaceId === workspace.id;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: () => {
        setWorkspaceId(workspace.id);
        onChange == null ? void 0 : onChange(workspace.id);
        setSelectorIsOpen(false);
      },
      className: clsx(
        "mb-4 flex cursor-pointer items-center gap-12 rounded-lg p-10 text-left",
        isActive && "bg-primary/5",
        !isActive && "hover:bg-hover"
      ),
      children: [
        /* @__PURE__ */ jsx(
          CheckIcon,
          {
            size: "sm",
            className: clsx("flex-shrink-0 text-primary", !isActive && "invisible")
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
          /* @__PURE__ */ jsx("div", { className: clsx("text-sm", isActive && "font-semibold"), children: workspace.name }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted", children: workspace.default ? /* @__PURE__ */ jsx(Trans, { message: "Personal workspace" }) : /* @__PURE__ */ jsx(
            Trans,
            {
              message: ":count members",
              values: { count: workspace.members_count }
            }
          ) })
        ] }),
        workspace.id !== 0 && /* @__PURE__ */ jsx(
          ManageButton,
          {
            setSelectorIsOpen,
            workspace,
            onChange
          }
        )
      ]
    }
  );
}
function LeaveWorkspaceDialog({
  workspace,
  onChange
}) {
  const removeMember2 = useRemoveMember();
  const { user } = useAuth();
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    LeaveWorkspaceConfirmation,
    {
      isLoading: removeMember2.isPending,
      onConfirm: () => {
        removeMember2.mutate(
          {
            workspaceId: workspace.id,
            memberId: user.id,
            memberType: "member"
          },
          {
            onSuccess: () => {
              close();
              onChange == null ? void 0 : onChange(PersonalWorkspace.id);
            }
          }
        );
      }
    }
  );
}
function DeleteWorkspaceConfirmation({
  workspace,
  onChange
}) {
  const deleteWorkspace2 = useDeleteWorkspace();
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isDanger: true,
      title: /* @__PURE__ */ jsx(Trans, { message: "Delete workspace" }),
      body: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Are you sure you want to delete “:name“?",
          values: { name: workspace.name }
        }
      ),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
      isLoading: deleteWorkspace2.isPending,
      onConfirm: () => {
        deleteWorkspace2.mutate(
          { id: workspace.id },
          {
            onSuccess: () => {
              close();
              onChange == null ? void 0 : onChange(PersonalWorkspace.id);
            }
          }
        );
      }
    }
  );
}
function ManageButton({
  setSelectorIsOpen,
  workspace,
  onChange
}) {
  const { user } = useAuth();
  return /* @__PURE__ */ jsxs(MenuTrigger, { onItemSelected: () => setSelectorIsOpen(false), children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        color: "primary",
        size: "xs",
        variant: "outline",
        endIcon: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
        children: /* @__PURE__ */ jsx(Trans, { message: "Manage" })
      }
    ),
    /* @__PURE__ */ jsxs(Menu, { children: [
      /* @__PURE__ */ jsx(
        Item,
        {
          onClick: (e) => {
            e.stopPropagation();
            openDialog(WorkspaceMembersDialog, { workspace });
          },
          value: "workspaceMembers",
          startIcon: /* @__PURE__ */ jsx(PersonAddIcon, {}),
          children: /* @__PURE__ */ jsx(Trans, { message: "Members" })
        }
      ),
      workspace.owner_id === (user == null ? void 0 : user.id) && /* @__PURE__ */ jsx(
        Item,
        {
          onClick: (e) => {
            e.stopPropagation();
            openDialog(RenameWorkspaceDialog, { workspace });
          },
          value: "updateWorkspace",
          startIcon: /* @__PURE__ */ jsx(EditIcon, {}),
          children: /* @__PURE__ */ jsx(Trans, { message: "Rename" })
        }
      ),
      workspace.owner_id !== (user == null ? void 0 : user.id) && /* @__PURE__ */ jsx(
        Item,
        {
          onClick: (e) => {
            e.stopPropagation();
            openDialog(LeaveWorkspaceDialog, { workspace, onChange });
          },
          value: "leaveWorkspace",
          startIcon: /* @__PURE__ */ jsx(ExitToAppIcon, {}),
          children: /* @__PURE__ */ jsx(Trans, { message: "Leave" })
        }
      ),
      workspace.owner_id === (user == null ? void 0 : user.id) && /* @__PURE__ */ jsx(
        Item,
        {
          onClick: (e) => {
            e.stopPropagation();
            openDialog(DeleteWorkspaceConfirmation, { workspace, onChange });
          },
          value: "deleteWorkspace",
          startIcon: /* @__PURE__ */ jsx(DeleteIcon, {}),
          children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
        }
      )
    ] })
  ] });
}
const endpoint$1 = "link/usage";
function useLinkSummary() {
  return useQuery({
    queryKey: [endpoint$1],
    queryFn: () => fetchLinkUsage()
  });
}
function fetchLinkUsage() {
  return apiClient.get(endpoint$1).then((response) => response.data);
}
function Meter(props) {
  return /* @__PURE__ */ jsx(ProgressBarBase, { ...props, role: "meter progressbar" });
}
const InfoIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" }),
  "InfoOutlined"
);
const resourceTranslationMap = {
  links: message("Links"),
  biolinks: message("Biolinks"),
  link_clicks: message("Visitors"),
  link_overlays: message("Link overlays"),
  custom_pages: message("Custom link pages"),
  custom_domains: message("Custom domains"),
  link_groups: message("Link groups"),
  tracking_pixels: message("Tracking pixels")
};
function ResourceUsageList() {
  const { data } = useLinkSummary();
  if (!data) {
    return null;
  }
  const unlimited = /* @__PURE__ */ jsx(Trans, { message: "Unlimited" });
  return /* @__PURE__ */ jsx("ul", { children: Object.entries(resourceTranslationMap).map(([key, label]) => {
    const usage = data == null ? void 0 : data.usage[key];
    if (!usage)
      return null;
    const name = /* @__PURE__ */ jsx(Trans, { ...label });
    return /* @__PURE__ */ jsx("li", { className: "mt-8", children: usage.total ? /* @__PURE__ */ jsx(
      Trans,
      {
        message: ":used out of :total :name",
        values: {
          used: /* @__PURE__ */ jsx(FormattedNumber, { value: usage.used }),
          total: usage.total ? /* @__PURE__ */ jsx(FormattedNumber, { value: usage.total }) : unlimited,
          name
        }
      }
    ) : /* @__PURE__ */ jsx(
      Trans,
      {
        message: ":count :name created",
        values: { count: usage.used, name }
      }
    ) }, key);
  }) });
}
function UsageDetailsTrigger({ className }) {
  var _a2, _b2;
  const { user } = useAuth();
  const subscription = (_a2 = user == null ? void 0 : user.subscriptions) == null ? void 0 : _a2[0];
  const planName = (_b2 = subscription == null ? void 0 : subscription.product) == null ? void 0 : _b2.name;
  const renewalDate = (subscription == null ? void 0 : subscription.renews_at) ? /* @__PURE__ */ jsx(FormattedDate, { date: subscription.renews_at }) : null;
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", triggerOnHover: true, children: [
    /* @__PURE__ */ jsx(IconButton, { size: "md", className, children: /* @__PURE__ */ jsx(InfoIcon, {}) }),
    /* @__PURE__ */ jsx(Dialog, { size: "auto", children: /* @__PURE__ */ jsxs(DialogBody, { children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b pb-10 mb-10", children: [
        /* @__PURE__ */ jsx("div", { className: "font-semibold", children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Current plan: :planName",
            values: {
              planName: planName || /* @__PURE__ */ jsx(Trans, { message: "Free" })
            }
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "text-muted text-xs", children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Next payment: :date",
            values: {
              date: renewalDate || /* @__PURE__ */ jsx(Trans, { message: "Never" })
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(ResourceUsageList, {})
    ] }) })
  ] });
}
function UsageMeter() {
  const { isLoading, data } = useLinkSummary();
  const links = data == null ? void 0 : data.usage.links;
  if (!links) {
    return /* @__PURE__ */ jsx("div", { className: "h-[53px] pt-24 mt-24 border-t" });
  }
  const label = /* @__PURE__ */ jsx("span", { className: clsx("whitespace-nowrap", isLoading && "invisible"), children: links.total ? /* @__PURE__ */ jsx(
    Trans,
    {
      message: ":used of :available links created",
      values: {
        used: /* @__PURE__ */ jsx(FormattedNumber, { value: links.used }),
        available: /* @__PURE__ */ jsx(FormattedNumber, { value: links.total })
      }
    }
  ) : /* @__PURE__ */ jsx(Trans, { message: ":count links created", values: { count: links.used } }) });
  return /* @__PURE__ */ jsxs("div", { className: "border-t items-start gap-8 flex pl-6 pt-24 mt-24", children: [
    /* @__PURE__ */ jsx(UsageDetailsTrigger, { className: "-mt-14" }),
    /* @__PURE__ */ jsx(
      Meter,
      {
        className: "flex-auto max-w-144",
        size: "xs",
        value: links.total && links.used ? links.used / links.total * 100 : 0,
        label,
        showValueLabel: false,
        labelPosition: "bottom"
      }
    )
  ] });
}
function UpgradeButton(props) {
  const { isSubscribed } = useAuth();
  return /* @__PURE__ */ jsx(
    Button,
    {
      elementType: Link,
      to: isSubscribed ? "/billing/change-plan" : "/pricing",
      variant: "outline",
      color: "primary",
      size: "xs",
      ...props,
      children: /* @__PURE__ */ jsx(Trans, { message: "Upgrade" })
    }
  );
}
function BelinkDashboardSidenav({ className, isCompactMode }) {
  const { billing } = useSettings();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "text-sm pt-26 text-muted font-medium bg-alt flex flex-col gap-20 border-r overflow-y-auto relative",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-auto px-12", children: [
          /* @__PURE__ */ jsx(
            CustomMenu,
            {
              matchDescendants: (to) => to === "/dashboard",
              menu: "dashboard-sidebar",
              orientation: "vertical",
              onlyShowIcons: isCompactMode,
              gap: "gap-8",
              itemClassName: ({ isActive }) => clsx(
                "block w-full rounded py-12 px-16 border-l-4",
                isActive ? "bg-primary/hover border-l-primary" : "border-l-transparent hover:bg-hover"
              )
            }
          ),
          !isCompactMode && /* @__PURE__ */ jsx(UsageMeter, {}),
          billing.enable && !isCompactMode && /* @__PURE__ */ jsx("div", { className: "mt-14 pl-60", children: /* @__PURE__ */ jsx(UpgradeButton, {}) })
        ] }),
        !isCompactMode && /* @__PURE__ */ jsx(WorkspaceSelector, { className: "w-full px-24 py-18 border-t flex-shrink-0 mt-auto" }),
        isCompactMode && /* @__PURE__ */ jsx(UsageDetailsTrigger, { className: "flex-shrink-0 mx-auto mb-10" })
      ]
    }
  );
}
function BelinkDashboardLayout() {
  const {
    links: { dash_footer }
  } = useSettings();
  return /* @__PURE__ */ jsxs(DashboardLayout, { name: "belink-dashboard", leftSidenavCanBeCompact: true, children: [
    /* @__PURE__ */ jsx(BelinkNavbar, {}),
    /* @__PURE__ */ jsx(DashboardSidenav, { position: "left", children: /* @__PURE__ */ jsx(BelinkDashboardSidenav, {}) }),
    /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsxs("div", { className: "bg dark:bg-alt", children: [
      /* @__PURE__ */ jsx(AdHost, { slot: "dashboard", className: "mb-20 mt-50" }),
      /* @__PURE__ */ jsx(Outlet, {}),
      dash_footer && /* @__PURE__ */ jsx(Footer$1, { padding: "px-16 md:px-28 pt-24 pb-28 md:pb-24" })
    ] }) })
  ] });
}
function BelinkNavbar(props) {
  var _a2;
  const { billing } = useSettings();
  const { leftSidenavStatus } = useContext(DashboardLayoutContext);
  const { selectedTheme } = useThemeSelector();
  const buttonColor = ((_a2 = selectedTheme.values) == null ? void 0 : _a2["--be-navbar-color"]) === "bg" ? "primary" : "paper";
  return /* @__PURE__ */ jsx(
    DashboardNavbar,
    {
      ...props,
      size: "sm",
      menuPosition: "dashboard-navbar",
      rightChildren: leftSidenavStatus === "compact" && billing.enable && /* @__PURE__ */ jsx(UpgradeButton, { variant: "flat", color: buttonColor }),
      children: leftSidenavStatus === "compact" && /* @__PURE__ */ jsx(
        WorkspaceSelector,
        {
          trigger: /* @__PURE__ */ jsx(Button, { variant: "text", endIcon: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Workspaces" }) })
        }
      )
    }
  );
}
const monthDayFormat = {
  month: "short",
  day: "2-digit"
};
function ReportDateSelector({
  value,
  onChange,
  disabled,
  compactOnMobile = true,
  enableCompare = false,
  granularity = "minute"
}) {
  const isMobile = useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "popover",
      onClose: (value2) => {
        if (value2) {
          onChange(value2);
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            color: "chip",
            endIcon: /* @__PURE__ */ jsx(DateRangeIcon, {}),
            disabled,
            children: /* @__PURE__ */ jsx(
              FormattedDateTimeRange,
              {
                start: value.start,
                end: value.end,
                options: isMobile && compactOnMobile ? monthDayFormat : DateFormatPresets.short
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          DateSelectorDialog,
          {
            value,
            enableCompare,
            granularity
          }
        )
      ]
    }
  );
}
function DateSelectorDialog({
  value,
  enableCompare,
  granularity
}) {
  const isMobile = useIsMobileMediaQuery();
  const state = useDateRangePickerState({
    granularity,
    defaultValue: {
      start: value.start,
      end: value.end,
      preset: value.preset
    },
    closeDialogOnSelection: false
  });
  const compareHasInitialValue = !!value.compareStart && !!value.compareEnd;
  const compareState = useDateRangePickerState({
    granularity,
    defaultValue: compareHasInitialValue ? {
      start: value.compareStart,
      end: value.compareEnd,
      preset: value.comparePreset
    } : DateRangeComparePresets[0].getRangeValue(state.selectedValue)
  });
  return /* @__PURE__ */ jsx(
    DateRangeDialog,
    {
      state,
      compareState: enableCompare ? compareState : void 0,
      compareVisibleDefault: compareHasInitialValue,
      showInlineDatePickerField: !isMobile
    }
  );
}
function ChartLayout(props) {
  const {
    title,
    description,
    children,
    className,
    contentIsFlex = true,
    contentClassName,
    contentRef,
    minHeight = "min-h-440"
  } = props;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "rounded-panel flex h-full flex-auto flex-col border bg",
        minHeight,
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-shrink-0 items-center justify-between p-14 text-xs", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: title }),
          description && /* @__PURE__ */ jsx("div", { className: "text-muted", children: description })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: contentRef,
            className: clsx(
              "relative p-14",
              contentIsFlex && "flex flex-auto items-center justify-center",
              contentClassName
            ),
            children
          }
        )
      ]
    }
  );
}
function ChartLoadingIndicator() {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10 text-sm absolute mx-auto", children: [
    /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, size: "sm" }),
    /* @__PURE__ */ jsx(Trans, { message: "Chart loading" })
  ] });
}
const LazyChart = lazy(() => import("./lazy-chart-9300132f.mjs"));
function BaseChart(props) {
  const { title, description, className, contentRef, isLoading } = props;
  return /* @__PURE__ */ jsx(
    ChartLayout,
    {
      title,
      description,
      className,
      contentRef,
      children: /* @__PURE__ */ jsxs(Suspense, { fallback: /* @__PURE__ */ jsx(ChartLoadingIndicator, {}), children: [
        /* @__PURE__ */ jsx(LazyChart, { ...props }),
        isLoading && /* @__PURE__ */ jsx(ChartLoadingIndicator, {})
      ] })
    }
  );
}
function formatReportData(report, { localeCode = "en", shareFirstDatasetLabels = true }) {
  if (!report)
    return { datasets: [] };
  const firstDatasetLabels = [];
  return {
    ...report,
    datasets: report.datasets.map((dataset, datasetIndex) => {
      const data = dataset.data.map((datasetItem, itemIndex) => {
        let label;
        if (datasetIndex === 0 || !shareFirstDatasetLabels) {
          label = generateDatasetLabels(
            datasetItem,
            report.granularity,
            localeCode
          );
          firstDatasetLabels[itemIndex] = label;
        } else {
          label = firstDatasetLabels[itemIndex];
        }
        return {
          ...label,
          value: datasetItem.value
        };
      });
      return { ...dataset, data };
    })
  };
}
function generateDatasetLabels(datum, granularity, locale2) {
  if (datum.label) {
    return { label: datum.label };
  }
  if (!datum.date) {
    return { label: "" };
  }
  return generateTimeLabels(datum, granularity, locale2);
}
function generateTimeLabels({ date: isoDate, endDate: isoEndDate }, granularity = "day", locale2) {
  const date = parseAbsoluteToLocal(isoDate).toDate();
  const endDate = isoEndDate ? parseAbsoluteToLocal(isoEndDate).toDate() : null;
  switch (granularity) {
    case "minute":
      return {
        label: getFormatter(locale2, {
          second: "2-digit"
        }).format(date),
        tooltipTitle: getFormatter(locale2, {
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          second: "2-digit"
        }).format(date)
      };
    case "hour":
      return {
        label: getFormatter(locale2, {
          hour: "numeric",
          minute: "numeric"
        }).format(date),
        tooltipTitle: getFormatter(locale2, {
          month: "short",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric"
        }).format(date)
      };
    case "day":
      return {
        label: getFormatter(locale2, {
          day: "2-digit",
          weekday: "short"
        }).format(date),
        tooltipTitle: getFormatter(locale2, {
          day: "2-digit",
          weekday: "short",
          month: "short"
        }).format(date)
      };
    case "week":
      return {
        label: getFormatter(locale2, {
          month: "short",
          day: "2-digit"
        }).format(date),
        tooltipTitle: getFormatter(locale2, {
          day: "2-digit",
          month: "long",
          year: "numeric"
        }).formatRange(date, endDate)
      };
    case "month":
      return {
        label: getFormatter(locale2, {
          month: "short",
          year: "numeric"
        }).format(date),
        tooltipTitle: getFormatter(locale2, {
          month: "long",
          year: "numeric"
        }).format(date)
      };
    case "year":
      return {
        label: getFormatter(locale2, {
          year: "numeric"
        }).format(date),
        tooltipTitle: getFormatter(locale2, {
          year: "numeric"
        }).format(date)
      };
  }
}
const getFormatter = memoize(
  (locale2, options) => {
    return new DateFormatter(locale2, options);
  },
  {
    equals: (a, b) => {
      return shallowEqual(a, b);
    },
    callTimeout: void 0
  }
);
const primaryColor = getBootstrapData().themes.all[0].values["--be-primary"];
const ChartColors = [
  [
    `rgb(${primaryColor.replaceAll(" ", ",")})`,
    `rgba(${primaryColor.replaceAll(" ", ",")},0.2)`
  ],
  ["rgb(255,112,67)", "rgb(255,112,67,0.2)"],
  ["rgb(255,167,38)", "rgb(255,167,38,0.2)"],
  ["rgb(141,110,99)", "rgb(141,110,99,0.2)"],
  ["rgb(102,187,106)", "rgba(102,187,106,0.2)"],
  ["rgb(92,107,192)", "rgb(92,107,192,0.2)"]
];
const LineChartOptions = {
  parsing: {
    xAxisKey: "label",
    yAxisKey: "value"
  },
  datasets: {
    line: {
      fill: "origin",
      tension: 0.1,
      pointBorderWidth: 4,
      pointHitRadius: 10
    }
  },
  plugins: {
    tooltip: {
      intersect: false,
      mode: "index"
    }
  }
};
function LineChart({ data, className, ...props }) {
  const { localeCode } = useSelectedLocale();
  const formattedData = useMemo(() => {
    const formattedData2 = formatReportData(data, { localeCode });
    formattedData2.datasets = formattedData2.datasets.map((dataset, i) => ({
      ...dataset,
      backgroundColor: ChartColors[i][1],
      borderColor: ChartColors[i][0],
      pointBackgroundColor: ChartColors[i][0]
    }));
    return formattedData2;
  }, [data, localeCode]);
  return /* @__PURE__ */ jsx(
    BaseChart,
    {
      ...props,
      className: clsx(className, "min-w-500"),
      data: formattedData,
      type: "line",
      options: LineChartOptions
    }
  );
}
const PolarAreaChartOptions = {
  parsing: {
    key: "value"
  },
  plugins: {
    tooltip: {
      intersect: true
    }
  }
};
function PolarAreaChart({
  data,
  className,
  ...props
}) {
  const { localeCode } = useSelectedLocale();
  const formattedData = useMemo(() => {
    var _a2;
    const formattedData2 = formatReportData(data, { localeCode });
    formattedData2.labels = (_a2 = formattedData2.datasets[0]) == null ? void 0 : _a2.data.map((d) => d.label);
    formattedData2.datasets = formattedData2.datasets.map((dataset, i) => ({
      ...dataset,
      backgroundColor: ChartColors.map((c) => c[1]),
      borderColor: ChartColors.map((c) => c[0]),
      borderWidth: 2
    }));
    return formattedData2;
  }, [data, localeCode]);
  return /* @__PURE__ */ jsx(
    BaseChart,
    {
      type: "polarArea",
      data: formattedData,
      options: PolarAreaChartOptions,
      className: clsx(className, "min-w-500"),
      ...props
    }
  );
}
function ReferrerChart({
  data,
  isLoading,
  ...layoutProps
}) {
  const dataItems = (data == null ? void 0 : data.datasets[0].data) || [];
  return /* @__PURE__ */ jsxs(
    ChartLayout,
    {
      ...layoutProps,
      className: "w-1/2 min-w-500 md:min-w-0",
      title: /* @__PURE__ */ jsx(Trans, { message: "Referrers" }),
      contentIsFlex: isLoading,
      contentClassName: "max-h-[370px] overflow-y-auto",
      children: [
        isLoading && /* @__PURE__ */ jsx(ChartLoadingIndicator, {}),
        dataItems.map((dataItem, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "mb-20 flex items-center justify-between gap-24 text-sm",
            children: [
              dataItem.label ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
                /* @__PURE__ */ jsx(RemoteFavicon, { url: dataItem.label }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    className: clsx(
                      LinkStyle,
                      "overflow-hidden overflow-ellipsis whitespace-nowrap lowercase"
                    ),
                    href: dataItem.label,
                    target: "_blank",
                    rel: "noreferrer",
                    children: removeProtocol(dataItem.label)
                  }
                )
              ] }) : /* @__PURE__ */ jsx(Trans, { message: "Direct, Email, SMS" }),
              /* @__PURE__ */ jsx(
                Chip,
                {
                  radius: "rounded",
                  size: "xs",
                  color: "primary",
                  className: "font-semibold",
                  children: dataItem.value
                }
              )
            ]
          },
          dataItem.label || index
        ))
      ]
    }
  );
}
const loaderUrl = "https://www.gstatic.com/charts/loader.js";
function useGoogleGeoChart({
  placeholderRef,
  data,
  country,
  onCountrySelected
}) {
  const { trans } = useTrans();
  const { analytics } = useSettings();
  const apiKey = analytics == null ? void 0 : analytics.gchart_api_key;
  const { selectedTheme } = useThemeSelector();
  const geoChartRef = useRef();
  const regionInteractivity = !!onCountrySelected && !country;
  const drawGoogleChart = useCallback(() => {
    var _a2, _b2;
    if (typeof google === "undefined")
      return;
    const seedData = data.map((location) => [location.label, location.value]);
    seedData.unshift([
      country ? trans(message("City")) : trans(message("Country")),
      trans(message("Clicks"))
    ]);
    const backgroundColor = `${themeValueToHex(
      selectedTheme.values["--be-paper"]
    )}`;
    const chartColor = `${themeValueToHex(
      selectedTheme.values["--be-primary"]
    )}`;
    const options = {
      colorAxis: { colors: [chartColor] },
      backgroundColor,
      region: country ? country.toUpperCase() : void 0,
      resolution: country ? "provinces" : "countries",
      displayMode: country ? "markers" : "regions",
      enableRegionInteractivity: regionInteractivity
    };
    if (!geoChartRef.current && placeholderRef.current && ((_a2 = google == null ? void 0 : google.visualization) == null ? void 0 : _a2.GeoChart)) {
      geoChartRef.current = new google.visualization.GeoChart(
        placeholderRef.current
      );
    }
    (_b2 = geoChartRef.current) == null ? void 0 : _b2.draw(
      google.visualization.arrayToDataTable(seedData),
      options
    );
  }, [
    selectedTheme,
    data,
    placeholderRef,
    trans,
    country,
    regionInteractivity
  ]);
  const initGoogleGeoChart = useCallback(async () => {
    if (lazyLoader.isLoadingOrLoaded(loaderUrl))
      return;
    await lazyLoader.loadAsset(loaderUrl, { type: "js", id: "google-charts-js" });
    await google.charts.load("current", {
      packages: ["geochart"],
      mapsApiKey: apiKey
    });
    drawGoogleChart();
  }, [apiKey, drawGoogleChart]);
  useEffect(() => {
    if (geoChartRef.current && onCountrySelected) {
      google.visualization.events.addListener(
        geoChartRef.current,
        "regionClick",
        (a) => onCountrySelected == null ? void 0 : onCountrySelected(a.region)
      );
    }
    return () => {
      if (geoChartRef.current) {
        google.visualization.events.removeAllListeners(geoChartRef.current);
      }
    };
  }, [onCountrySelected, geoChartRef.current]);
  useEffect(() => {
    initGoogleGeoChart();
  }, [initGoogleGeoChart]);
  useEffect(() => {
    drawGoogleChart();
  }, [selectedTheme, drawGoogleChart, data]);
  return { drawGoogleChart };
}
const ArrowBackIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" }),
  "ArrowBackOutlined"
);
const InfoDialogTriggerIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9 8a1 1 0 0 0-1-1H5.5a1 1 0 1 0 0 2H7v4a1 1 0 0 0 2 0zM4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm4 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" }),
  "InfoDialogTrigger"
);
function InfoDialogTrigger({
  title,
  body,
  dialogSize = "sm",
  className
}) {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", triggerOnHover: true, children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        className: clsx("ml-4 text-muted opacity-70", className),
        iconSize: "xs",
        size: "2xs",
        children: /* @__PURE__ */ jsx(InfoDialogTriggerIcon, { viewBox: "0 0 16 16" })
      }
    ),
    /* @__PURE__ */ jsxs(Dialog, { size: dialogSize, children: [
      title && /* @__PURE__ */ jsx(DialogHeader, { padding: "px-18 pt-12", size: "md", hideDismissButton: true, children: title }),
      /* @__PURE__ */ jsx(DialogBody, { children: body })
    ] })
  ] });
}
const FormattedCountryName = memo(({ code: countryCode }) => {
  const { localeCode } = useSelectedLocale();
  const regionNames = new Intl.DisplayNames([localeCode], { type: "region" });
  let formattedName;
  try {
    formattedName = regionNames.of(countryCode.toUpperCase());
  } catch (e) {
  }
  return /* @__PURE__ */ jsx(Fragment, { children: formattedName });
});
function GeoChart({
  data: metricData,
  isLoading,
  onCountrySelected,
  country,
  ...layoutProps
}) {
  const placeholderRef = useRef(null);
  const regionInteractivity = !!onCountrySelected;
  const initialData = metricData == null ? void 0 : metricData.datasets[0].data;
  const data = useMemo(() => {
    return initialData || [];
  }, [initialData]);
  useGoogleGeoChart({ placeholderRef, data, country, onCountrySelected });
  return /* @__PURE__ */ jsxs(
    ChartLayout,
    {
      ...layoutProps,
      className: "min-w-500",
      title: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Trans, { message: "Top Locations" }),
        country ? /* @__PURE__ */ jsxs("span", { className: "pl-4", children: [
          "(",
          /* @__PURE__ */ jsx(FormattedCountryName, { code: country }),
          ")"
        ] }) : null,
        regionInteractivity && /* @__PURE__ */ jsx(InfoTrigger$6, {})
      ] }),
      contentIsFlex: isLoading,
      children: [
        isLoading && /* @__PURE__ */ jsx(ChartLoadingIndicator, {}),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-24", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: placeholderRef,
              className: "flex-auto w-[480px] min-h-[340px]"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "w-[170px]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm max-h-[340px] w-full flex-initial overflow-y-auto", children: data.map((location) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: clsx(
                  "flex items-center gap-4 mb-4",
                  regionInteractivity && "cursor-pointer hover:underline"
                ),
                role: regionInteractivity ? "button" : void 0,
                onClick: () => {
                  onCountrySelected == null ? void 0 : onCountrySelected(location.code);
                },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "max-w-110 whitespace-nowrap overflow-hidden overflow-ellipsis", children: location.label }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    "(",
                    location.percentage,
                    ")%"
                  ] })
                ]
              },
              location.label
            )) }),
            country && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "xs",
                className: "mt-14",
                startIcon: /* @__PURE__ */ jsx(ArrowBackIcon, {}),
                onClick: () => {
                  onCountrySelected == null ? void 0 : onCountrySelected(void 0);
                },
                children: /* @__PURE__ */ jsx(Trans, { message: "Back to countries" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function InfoTrigger$6() {
  return /* @__PURE__ */ jsx(
    InfoDialogTrigger,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Zooming in" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Click on a country inside the map or country list to zoom in and see city data for that country." })
    }
  );
}
function BarChart({
  data,
  direction = "vertical",
  individualBarColors = false,
  className,
  ...props
}) {
  const { localeCode } = useSelectedLocale();
  const formattedData = useMemo(() => {
    const formattedData2 = formatReportData(data, { localeCode });
    formattedData2.datasets = formattedData2.datasets.map((dataset, i) => ({
      ...dataset,
      backgroundColor: individualBarColors ? ChartColors.map((c) => c[1]) : ChartColors[i][1],
      borderColor: individualBarColors ? ChartColors.map((c) => c[0]) : ChartColors[i][0],
      borderWidth: 2
    }));
    return formattedData2;
  }, [data, localeCode, individualBarColors]);
  const isHorizontal = direction === "horizontal";
  const options = useMemo(() => {
    return {
      indexAxis: isHorizontal ? "y" : "x",
      parsing: {
        xAxisKey: isHorizontal ? "value" : "label",
        yAxisKey: isHorizontal ? "label" : "value"
      }
    };
  }, [isHorizontal]);
  return /* @__PURE__ */ jsx(
    BaseChart,
    {
      type: "bar",
      className: clsx(className, "min-w-500"),
      data: formattedData,
      options,
      ...props
    }
  );
}
const endpoint = "reports/clicks";
function useClicksReport(payload, options) {
  return useQuery({
    queryKey: [endpoint, payload],
    queryFn: () => fetchClicksReport(endpoint, payload),
    placeholderData: keepPreviousData,
    enabled: options.isEnabled
  });
}
function fetchClicksReport(endpoint2, payload) {
  var _a2;
  const params2 = {
    model: payload.model,
    metrics: (_a2 = payload.metrics) == null ? void 0 : _a2.join(","),
    country: payload.country
  };
  params2.startDate = payload.dateRange.start.toAbsoluteString();
  params2.endDate = payload.dateRange.end.toAbsoluteString();
  params2.timezone = payload.dateRange.start.timeZone;
  return apiClient.get(endpoint2, { params: params2 }).then((response) => response.data);
}
function ClicksReportCharts({ dateRange, model }) {
  const colGap = "gap-12 md:gap-24 mb-12 md:mb-24";
  const rowClassName = `flex flex-col lg:flex-row lg:items-center overflow-x-auto ${colGap}`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: rowClassName, children: [
      /* @__PURE__ */ jsx(AsyncChart, { metric: "clicks", model, dateRange, children: ({ data }) => /* @__PURE__ */ jsx(
        LineChart,
        {
          className: "flex-auto",
          title: /* @__PURE__ */ jsx(Trans, { message: "Click count" }),
          hideLegend: true,
          description: /* @__PURE__ */ jsx(
            Trans,
            {
              message: ":count total clicks",
              values: {
                count: /* @__PURE__ */ jsx(FormattedNumber, { value: (data == null ? void 0 : data.report.clicks.total) || 0 })
              }
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx(AsyncChart, { metric: "devices", model, dateRange, children: /* @__PURE__ */ jsx(
        PolarAreaChart,
        {
          title: /* @__PURE__ */ jsx(Trans, { message: "Top devices" }),
          className: "max-w-500"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: rowClassName, children: [
      /* @__PURE__ */ jsx(AsyncChart, { metric: "referrers", model, dateRange, children: /* @__PURE__ */ jsx(ReferrerChart, {}) }),
      /* @__PURE__ */ jsx(GeoChartWithCities, { dateRange, model })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: rowClassName, children: [
      /* @__PURE__ */ jsx(AsyncChart, { metric: "browsers", model, dateRange, children: /* @__PURE__ */ jsx(
        BarChart,
        {
          className: "max-w-500",
          direction: "horizontal",
          individualBarColors: true,
          hideLegend: true,
          title: /* @__PURE__ */ jsx(Trans, { message: "Top browsers" })
        }
      ) }),
      /* @__PURE__ */ jsx(AsyncChart, { metric: "platforms", model, dateRange, children: /* @__PURE__ */ jsx(
        PolarAreaChart,
        {
          className: "max-w-500",
          title: /* @__PURE__ */ jsx(Trans, { message: "Top platforms" })
        }
      ) })
    ] })
  ] });
}
function GeoChartWithCities({ model, dateRange }) {
  const [params2, setParams] = useSearchParams();
  const selectedCountry = params2.get("country") || void 0;
  const handleCountrySelected = useCallback(
    (country) => {
      setParams((prev) => {
        if (country) {
          prev.set("country", country);
        } else {
          prev.delete("country");
        }
        return prev;
      });
    },
    [setParams]
  );
  return /* @__PURE__ */ jsx(
    AsyncChart,
    {
      metric: selectedCountry ? "cities" : "countries",
      model,
      dateRange,
      country: selectedCountry,
      children: /* @__PURE__ */ jsx(
        GeoChart,
        {
          onCountrySelected: handleCountrySelected,
          country: selectedCountry,
          className: "flex-auto w-1/2 lg:max-w-[740px]"
        }
      )
    }
  );
}
function AsyncChart({ children, metric, model, dateRange }) {
  var _a2, _b2;
  const [isEnabled, setIsEnabled] = useState(false);
  const [params2] = useSearchParams();
  const query = useClicksReport(
    { metrics: [metric], model, dateRange, country: params2.get("country") },
    { isEnabled }
  );
  const chart = typeof children === "function" ? children(query) : children;
  const observerRef = useRef();
  const contentRef = useCallback((el) => {
    var _a3;
    if (el) {
      const observer = new IntersectionObserver(
        ([e]) => {
          var _a4;
          if (e.isIntersecting) {
            setIsEnabled(true);
            (_a4 = observerRef.current) == null ? void 0 : _a4.disconnect();
            observerRef.current = void 0;
          }
        },
        { threshold: 0.1 }
        // if only header is visible, don't load
      );
      observerRef.current = observer;
      observer.observe(el);
    } else if (observerRef.current) {
      (_a3 = observerRef.current) == null ? void 0 : _a3.disconnect();
    }
  }, []);
  return cloneElement(chart, {
    data: (_b2 = (_a2 = query.data) == null ? void 0 : _a2.report) == null ? void 0 : _b2[metric],
    isLoading: query.isLoading,
    contentRef
  });
}
function ClicksReportPageLayout({
  model,
  title,
  actions
}) {
  const [dateRange, setDateRange] = useState(() => {
    return DateRangePresets[2].getRangeValue();
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-full gap-12 md:gap-24 p-12 md:p-24", children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Clicks report" }) }),
    /* @__PURE__ */ jsxs("div", { className: "md:flex items-center justify-between gap-24 mb-24", children: [
      title,
      /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 flex items-center md:justify-end mt-10 md:mt-0 gap-12", children: [
        actions,
        /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: /* @__PURE__ */ jsx(
          ReportDateSelector,
          {
            value: dateRange,
            onChange: setDateRange,
            compactOnMobile: false
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(ClicksReportCharts, { dateRange, model })
  ] });
}
function AllClicksReportPage() {
  const { workspaceId } = useActiveWorkspaceId();
  const { user } = useAuth();
  const model = workspaceId && workspaceId > 0 ? `workspace=${workspaceId}` : `user=${user == null ? void 0 : user.id}`;
  return /* @__PURE__ */ jsx(
    ClicksReportPageLayout,
    {
      model,
      title: /* @__PURE__ */ jsx("h1", { className: "text-3xl font-light", children: /* @__PURE__ */ jsx(Trans, { message: "Clicks report" }) })
    }
  );
}
const LinksDatatableFilters = [
  {
    key: "type",
    label: message("Type"),
    description: message("Type of the link"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("Direct"),
          value: "direct"
        },
        {
          key: "02",
          label: message("Overlay"),
          value: "overlay"
        },
        {
          key: "03",
          label: message("Frame"),
          value: "frame"
        },
        {
          key: "04",
          label: message("Custom page"),
          value: "link_page"
        }
      ]
    }
  },
  {
    key: "active",
    label: message("Status"),
    description: message("Whether link is disabled or not"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("Enabled"),
          value: true
        },
        {
          key: "02",
          label: message("Disabled"),
          value: false
        }
      ]
    }
  },
  {
    key: "password",
    label: message("Password"),
    description: message("Whether link is password protected"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("Has a password"),
          value: { value: null, operator: FilterOperator.ne }
        },
        {
          key: "02",
          label: message("Does not have a password"),
          value: { value: null, operator: FilterOperator.eq }
        }
      ]
    }
  },
  {
    key: "clicks_count",
    label: message("Click count"),
    description: message("Total number of clicks for link"),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: "number",
      defaultValue: 1
    }
  },
  timestampFilter({
    key: "clicked_at",
    label: message("Clicked at"),
    description: message("Date link was last clicked")
  }),
  timestampFilter({
    key: "expires_at",
    label: message("Expires at"),
    description: message("Date link will expire")
  }),
  createdAtFilter({
    description: message("Date link was created")
  }),
  updatedAtFilter({
    description: message("Date link was last updated")
  }),
  {
    key: "user_id",
    label: message("User"),
    description: message("User link was created by"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL
    }
  }
];
const names = [
  "countries",
  "domains",
  "pages",
  "overlays",
  "pixels",
  "groups"
];
function useLinkFormValueLists() {
  const { user } = useAuth();
  return useValueLists(names, { userId: user == null ? void 0 : user.id, pageType: "link_page" });
}
function prefetchLinkFormValueLists() {
  var _a2;
  prefetchValueLists(names, {
    userId: (_a2 = getBootstrapData().user) == null ? void 0 : _a2.id,
    pageType: "link_page"
  });
}
function LinkTypeField() {
  var _a2, _b2, _c;
  const {
    branding: { site_name }
  } = useSettings();
  const { data } = useLinkFormValueLists();
  const { watch, setValue } = useFormContext();
  const type = watch("type");
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        className: "mb-24 flex-auto",
        name: "type",
        label: /* @__PURE__ */ jsx(Trans, { message: "Type" }),
        selectionMode: "single",
        onSelectionChange: () => {
          setValue("type_id", null);
        },
        children: [
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "direct",
              description: /* @__PURE__ */ jsx(Trans, { message: "Redirect user to url instantly" }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Direct" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "frame",
              description: /* @__PURE__ */ jsx(
                Trans,
                {
                  message: " Show url inside iframe with :siteName navigation bar.",
                  values: { siteName: site_name }
                }
              ),
              children: /* @__PURE__ */ jsx(Trans, { message: "Frame" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "splash",
              description: /* @__PURE__ */ jsx(Trans, { message: "Show splash page with optional ads and redirect user to url after a delay." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Splash" })
            }
          ),
          ((_a2 = data == null ? void 0 : data.pages) == null ? void 0 : _a2.length) ? /* @__PURE__ */ jsx(
            Item,
            {
              value: "page",
              description: /* @__PURE__ */ jsx(
                Trans,
                {
                  message: "Show specified link page with :siteName navigation bar and button to open\n      long url.",
                  values: { siteName: site_name }
                }
              ),
              children: /* @__PURE__ */ jsx(Trans, { message: "Link page" })
            }
          ) : null,
          (data == null ? void 0 : data.overlays.length) ? /* @__PURE__ */ jsx(
            Item,
            {
              value: "overlay",
              description: /* @__PURE__ */ jsx(Trans, { message: "Redirect user instantly and show specified overlay over the link." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Overlay" })
            }
          ) : null
        ]
      }
    ),
    type === "page" && /* @__PURE__ */ jsx(
      FormSelect,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Link page" }),
        name: "type_id",
        selectionMode: "single",
        className: "mb-24 flex-auto",
        required: true,
        children: (_b2 = data == null ? void 0 : data.pages) == null ? void 0 : _b2.map((page) => /* @__PURE__ */ jsx(Item, { value: page.id, children: page.title }, page.id))
      }
    ),
    type === "overlay" && /* @__PURE__ */ jsx(
      FormSelect,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Link overlay" }),
        name: "type_id",
        selectionMode: "single",
        className: "mb-24 flex-auto",
        required: true,
        children: (_c = data == null ? void 0 : data.overlays) == null ? void 0 : _c.map((overlay) => /* @__PURE__ */ jsx(Item, { value: overlay.id, children: overlay.name }, overlay.id))
      }
    )
  ] });
}
const upgradeSvg = "/assets/upgrade-1a8523e3.svg";
function UpgradeDialog({ message: message2, messageSuffix }) {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { size: "sm", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Join the PROs" }) }),
    /* @__PURE__ */ jsxs(DialogBody, { children: [
      /* @__PURE__ */ jsx("div", { className: "mb-20 text-center", children: /* @__PURE__ */ jsx(SvgImage, { src: upgradeSvg, className: "mx-auto", height: "h-100" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        message2,
        " ",
        messageSuffix
      ] })
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          size: "xs",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Maybe later" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          autoFocus: true,
          variant: "flat",
          size: "xs",
          color: "primary",
          elementType: Link,
          to: "/pricing",
          target: "_blank",
          onClick: () => close(),
          children: /* @__PURE__ */ jsx(Trans, { message: "Find out more" })
        }
      )
    ] })
  ] });
}
function FeatureLockedDialog({
  message: message2,
  messageSuffix
}) {
  return /* @__PURE__ */ jsx(
    UpgradeDialog,
    {
      message: message2,
      messageSuffix: messageSuffix === void 0 ? /* @__PURE__ */ jsx(Trans, { message: "Upgrade to unlock this feature and many more." }) : messageSuffix
    }
  );
}
function NoPermissionButton({
  message: message2,
  className,
  iconButton
}) {
  const { billing } = useSettings();
  if (!billing.enable) {
    return /* @__PURE__ */ jsx(GenericButton, { className });
  }
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", triggerOnHover: true, children: [
    iconButton ? /* @__PURE__ */ jsx(IconButton, { className, color: "primary", size: "sm", children: /* @__PURE__ */ jsx(LockIcon, {}) }) : /* @__PURE__ */ jsx(
      Button,
      {
        variant: "flat",
        color: "primary",
        size: "2xs",
        startIcon: /* @__PURE__ */ jsx(LockIcon, {}),
        className,
        children: /* @__PURE__ */ jsx(Trans, { message: "Upgrade" })
      }
    ),
    /* @__PURE__ */ jsx(FeatureLockedDialog, { message: message2 })
  ] });
}
function GenericButton({ className }) {
  return /* @__PURE__ */ jsx(
    Tooltip,
    {
      label: /* @__PURE__ */ jsx(Trans, { message: "You don't have permissions to access this feature." }),
      children: /* @__PURE__ */ jsx(LockIcon, { size: "sm", className: clsx("text-muted", className) })
    }
  );
}
function LinkFormSection({
  title,
  description,
  children,
  upgradeMessage
}) {
  return /* @__PURE__ */ jsxs("div", { className: "border-t pt-24", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "font-semibold",
          upgradeMessage && "mb-8 flex items-center gap-10"
        ),
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm", children: title }),
          upgradeMessage && /* @__PURE__ */ jsx(NoPermissionButton, { message: upgradeMessage })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-muted", children: description }),
    children
  ] });
}
function useLinkFeatureStatus(feature) {
  const { data } = useLinkSummary();
  const { hasPermission } = useAuth();
  const disabled = !(data == null ? void 0 : data.usage.links[feature]) && !hasPermission("admin");
  return { disabled };
}
function LinkRestrictionFields({ linkName }) {
  const { disabled } = useLinkFeatureStatus("password");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        type: "password",
        name: "password",
        label: /* @__PURE__ */ jsx(Trans, { message: "Password" }),
        autoComplete: "new-password",
        className: "mb-24",
        labelSuffix: disabled && /* @__PURE__ */ jsx(
          NoPermissionButton,
          {
            message: /* @__PURE__ */ jsx(Trans, { message: "Your current plan doesn't include link password protection." })
          }
        ),
        disabled
      }
    ),
    /* @__PURE__ */ jsx(ScheduleFields, { linkName }),
    /* @__PURE__ */ jsx(ExpirationClicksField, { linkName })
  ] });
}
function ScheduleFields({ linkName }) {
  const now2 = useCurrentDateTime();
  const { disabled } = useLinkFeatureStatus("expiration");
  return /* @__PURE__ */ jsx(
    LinkFormSection,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Schedule" }),
      description: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Specify a date when :name should become active and when it should expire. Both activation and expiration dates are optional.",
          values: { name: linkName }
        }
      ),
      upgradeMessage: disabled && /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Your current plan doesn't include :name scheduling.",
          values: { name: linkName }
        }
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "mt-24 block items-center gap-24 md:flex", children: [
        /* @__PURE__ */ jsx(
          FormDatePicker,
          {
            showCalendarFooter: true,
            label: /* @__PURE__ */ jsx(Trans, { message: "Activation date" }),
            min: now2,
            name: "activates_at",
            className: "mb-24 flex-auto",
            disabled
          }
        ),
        /* @__PURE__ */ jsx(
          FormDatePicker,
          {
            showCalendarFooter: true,
            label: /* @__PURE__ */ jsx(Trans, { message: "Expiration date" }),
            min: now2,
            name: "expires_at",
            className: "mb-24 flex-auto",
            disabled
          }
        )
      ] })
    }
  );
}
function ExpirationClicksField({ linkName }) {
  const { trans } = useTrans();
  const { disabled } = useLinkFeatureStatus("expiration");
  return /* @__PURE__ */ jsx(
    LinkFormSection,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Expiration clicks" }),
      description: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "After :name is visited specified amount of times, it will no longer be accessible.\nOptionally, after click amount is reached :name can redirect to specified url instead.",
          values: { name: linkName }
        }
      ),
      upgradeMessage: disabled && /* @__PURE__ */ jsx(Trans, { message: "Your current plan doesn't include expiration clicks." }),
      children: /* @__PURE__ */ jsxs("div", { className: "mt-24 block items-center gap-24 md:flex", children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            type: "number",
            label: /* @__PURE__ */ jsx(Trans, { message: "Max clicks" }),
            name: "exp_clicks_rule.key",
            className: "mb-24 flex-auto",
            disabled
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            type: "url",
            label: /* @__PURE__ */ jsx(Trans, { message: "Redirect URL" }),
            placeholder: trans(message("Optional")),
            name: "exp_clicks_rule.value",
            className: "mb-24 flex-auto",
            disabled
          }
        )
      ] })
    }
  );
}
const SwapVertIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3 5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3 5 6.99h3V14h2V6.99h3L9 3z" }),
  "SwapVertOutlined"
);
function LinkRetargetingFields() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(GeoFields, {}),
    /* @__PURE__ */ jsx(DeviceFields, {}),
    /* @__PURE__ */ jsx(PlatformFields, {})
  ] });
}
function GeoFields() {
  const { trans } = useTrans();
  const { data } = useLinkFormValueLists();
  return /* @__PURE__ */ jsx(
    FieldsLayout,
    {
      defaultKey: "us",
      name: "geo_rules",
      title: /* @__PURE__ */ jsx(Trans, { message: "Location targeting" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Redirect users to different url based on their location." }),
      buttonLabel: /* @__PURE__ */ jsx(Trans, { message: "Add location" }),
      children: /* @__PURE__ */ jsx(
        FormSelect,
        {
          required: true,
          showSearchField: true,
          searchPlaceholder: trans(message("Search countries")),
          selectionMode: "single",
          items: data == null ? void 0 : data.countries,
          name: "temp",
          label: /* @__PURE__ */ jsx(Trans, { message: "Country" }),
          className: "mt-24 flex-auto",
          children: (country) => /* @__PURE__ */ jsx(Item, { value: country.code, children: country.name }, country.code)
        }
      )
    }
  );
}
function DeviceFields() {
  return /* @__PURE__ */ jsx(
    FieldsLayout,
    {
      name: "device_rules",
      title: /* @__PURE__ */ jsx(Trans, { message: "Device targeting" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Redirect users to different url based on their device." }),
      buttonLabel: /* @__PURE__ */ jsx(Trans, { message: "Add device" }),
      defaultKey: "desktop",
      children: /* @__PURE__ */ jsxs(
        FormSelect,
        {
          required: true,
          selectionMode: "single",
          name: "temp",
          label: /* @__PURE__ */ jsx(Trans, { message: "Device" }),
          className: "mt-24 flex-auto",
          children: [
            /* @__PURE__ */ jsx(Item, { value: "desktop", children: /* @__PURE__ */ jsx(Trans, { message: "Desktop" }) }),
            /* @__PURE__ */ jsx(Item, { value: "table", children: /* @__PURE__ */ jsx(Trans, { message: "Tablet" }) }),
            /* @__PURE__ */ jsx(Item, { value: "mobile", children: /* @__PURE__ */ jsx(Trans, { message: "Mobile" }) })
          ]
        }
      )
    }
  );
}
function PlatformFields() {
  return /* @__PURE__ */ jsx(
    FieldsLayout,
    {
      name: "platform_rules",
      title: /* @__PURE__ */ jsx(Trans, { message: "Platform targeting" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Redirect users to different url based on their platform." }),
      defaultKey: "windows",
      buttonLabel: /* @__PURE__ */ jsx(Trans, { message: "Add platform" }),
      children: /* @__PURE__ */ jsxs(
        FormSelect,
        {
          name: "temp",
          required: true,
          selectionMode: "single",
          label: /* @__PURE__ */ jsx(Trans, { message: "Platform" }),
          className: "mt-24 flex-auto",
          children: [
            /* @__PURE__ */ jsx(Item, { value: "windows", children: /* @__PURE__ */ jsx(Trans, { message: "Windows" }) }),
            /* @__PURE__ */ jsx(Item, { value: "osx", children: /* @__PURE__ */ jsx(Trans, { message: "MacOs" }) }),
            /* @__PURE__ */ jsx(Item, { value: "ios", children: /* @__PURE__ */ jsx(Trans, { message: "iOS" }) }),
            /* @__PURE__ */ jsx(Item, { value: "android", children: /* @__PURE__ */ jsx(Trans, { message: "Android" }) }),
            /* @__PURE__ */ jsx(Item, { value: "linux", children: /* @__PURE__ */ jsx(Trans, { message: "Linux" }) })
          ]
        }
      )
    }
  );
}
function FieldsLayout({
  name,
  title,
  description,
  buttonLabel,
  defaultKey,
  children
}) {
  const { fields, append, remove } = useFieldArray({
    name
  });
  const { disabled } = useLinkFeatureStatus("retargeting");
  return /* @__PURE__ */ jsxs(
    LinkFormSection,
    {
      title,
      description,
      upgradeMessage: disabled && /* @__PURE__ */ jsx(Trans, { message: "Your current plan doesn't include link retargeting." }),
      children: [
        fields.map((field, index) => /* @__PURE__ */ jsxs("div", { className: "block items-end gap-14 md:flex", children: [
          cloneElement(children, { name: `${name}.${index}.key`, disabled }),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              required: true,
              type: "url",
              name: `${name}.${index}.value`,
              label: /* @__PURE__ */ jsx(Trans, { message: "URL" }),
              className: "mt-24 flex-auto",
              disabled
            }
          ),
          /* @__PURE__ */ jsx(RemoveButton$1, { onClick: () => remove(index) })
        ] }, field.id)),
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "my-8",
            variant: "text",
            color: "primary",
            startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
            onClick: () => {
              append({ key: defaultKey, value: "" });
            },
            disabled,
            children: buttonLabel
          }
        )
      ]
    }
  );
}
function RemoveButton$1({ onClick }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mt-12 md:hidden", children: /* @__PURE__ */ jsx(Button, { variant: "outline", color: "danger", size: "xs", onClick, children: /* @__PURE__ */ jsx(Trans, { message: "Remove" }) }) }),
    /* @__PURE__ */ jsx(IconButton, { color: "danger", onClick, className: "max-md:hidden", children: /* @__PURE__ */ jsx(CloseIcon, {}) })
  ] });
}
const PublicIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z" }),
  "PublicOutlined"
);
function LinkSeoFields({ hideTitle }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "block md:flex gap-24 mb-24", children: [
      /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
        FormImageSelector,
        {
          name: "image",
          diskPrefix: "links",
          variant: "avatar",
          previewSize: "w-90 h-90",
          previewRadius: "rounded",
          placeholderIcon: /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-alt rounded" }),
          showRemoveButton: true
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-auto my-24 md:my-0", children: [
        !hideTitle && /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "name",
            label: /* @__PURE__ */ jsx(Trans, { message: "Title" }),
            className: "mb-24"
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            inputElementType: "textarea",
            name: "description",
            rows: 2,
            label: /* @__PURE__ */ jsx(Trans, { message: "description" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      FormChipField,
      {
        name: "tags",
        label: /* @__PURE__ */ jsx(Trans, { message: "Tags" }),
        valueKey: "name"
      }
    )
  ] });
}
const AccountTreeIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3h7zM7 9H4V5h3v4zm10 6h3v4h-3v-4zm0-10h3v4h-3V5z" }),
  "AccountTreeOutlined"
);
function LinkUtmFields() {
  const { trans } = useTrans();
  const { disabled } = useLinkFeatureStatus("utm");
  return /* @__PURE__ */ jsxs(
    LinkFormSection,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "UTM tags" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Add UTMs to track web traffic in analytics tools." }),
      upgradeMessage: disabled && /* @__PURE__ */ jsx(Trans, { message: "Your current plan doesn't include UTM functionality." }),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "block md:flex gap-24 items-center mt-24", children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "utm.source",
              label: /* @__PURE__ */ jsx(Trans, { message: "Source" }),
              placeholder: trans(message("e.g: adwords, google, facebook")),
              className: "mb-24 flex-auto",
              disabled
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "utm.medium",
              label: /* @__PURE__ */ jsx(Trans, { message: "Medium" }),
              placeholder: trans(message("e.g: banner, email, social post")),
              className: "mb-24 flex-auto",
              disabled
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "block md:flex gap-24 items-center", children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "utm.campaign",
              label: /* @__PURE__ */ jsx(Trans, { message: "Campaign" }),
              placeholder: trans(message("e.g: holiday special, birthday promo")),
              className: "mb-24 flex-auto",
              disabled
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "utm.term",
              label: /* @__PURE__ */ jsx(Trans, { message: "Term" }),
              placeholder: trans(message("Use to identify ppc keywords")),
              className: "mb-24 flex-auto",
              disabled
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "utm.content",
            label: /* @__PURE__ */ jsx(Trans, { message: "Content" }),
            placeholder: trans(
              message("Use to differentiate ads or words on a page")
            ),
            className: "mb-24",
            disabled
          }
        ),
        /* @__PURE__ */ jsx(CustomTagsSection, {})
      ]
    }
  );
}
function CustomTagsSection() {
  const { fields, append, remove } = useFieldArray({
    name: "utm_custom"
  });
  const { disabled } = useLinkFeatureStatus("utm");
  return /* @__PURE__ */ jsxs(
    LinkFormSection,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Custom parameters" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Add query parameters to track web traffic in analytics tools." }),
      upgradeMessage: disabled && /* @__PURE__ */ jsx(Trans, { message: "Your current plan doesn't include query parameters functionality." }),
      children: [
        fields.map((field, index) => /* @__PURE__ */ jsxs("div", { className: "block md:flex items-end gap-14", children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              required: true,
              name: `utm_custom.${index}.key`,
              label: /* @__PURE__ */ jsx(Trans, { message: "Key" }),
              className: "flex-auto mt-24",
              disabled
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              required: true,
              name: `utm_custom.${index}.value`,
              label: /* @__PURE__ */ jsx(Trans, { message: "Value" }),
              className: "flex-auto mt-24",
              disabled
            }
          ),
          /* @__PURE__ */ jsx(RemoveButton, { onClick: () => remove(index) })
        ] }, field.id)),
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "mb-24 mt-12",
            variant: "text",
            color: "primary",
            startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
            onClick: () => {
              append({ key: "", value: "" });
            },
            disabled,
            children: /* @__PURE__ */ jsx(Trans, { message: "Add parameter" })
          }
        )
      ]
    }
  );
}
function RemoveButton({ onClick }) {
  const isMobile = useIsMobileMediaQuery();
  if (isMobile) {
    return /* @__PURE__ */ jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsx(Button, { variant: "outline", color: "danger", size: "xs", onClick, children: /* @__PURE__ */ jsx(Trans, { message: "Remove" }) }) });
  }
  return /* @__PURE__ */ jsx(IconButton, { color: "danger", onClick, children: /* @__PURE__ */ jsx(CloseIcon, {}) });
}
function useDefaultCustomDomainHost(allDomains) {
  const { custom_domains, base_url } = useSettings();
  return useMemo(() => {
    var _a2;
    const selectedHost = custom_domains == null ? void 0 : custom_domains.default_host;
    if (selectedHost) {
      const host = (_a2 = allDomains == null ? void 0 : allDomains.find((d) => d.host === selectedHost)) == null ? void 0 : _a2.host;
      if (host)
        return host;
    }
    return base_url.replace(/\/$/, "").replace(/(^\w+:|^)\/\//, "");
  }, [custom_domains, base_url, allDomains]);
}
function LinkDomainSelect({
  ...selectProps
}) {
  var _a2;
  const { data } = useLinkFormValueLists();
  const defaultHost = useDefaultCustomDomainHost(data == null ? void 0 : data.domains);
  const { custom_domains } = useSettings();
  const domains = (data == null ? void 0 : data.domains) || [];
  if (!(custom_domains == null ? void 0 : custom_domains.allow_select) || !domains.length)
    return null;
  return /* @__PURE__ */ jsxs(
    FormSelect,
    {
      selectionMode: "single",
      label: /* @__PURE__ */ jsx(Trans, { message: "Domain" }),
      ...selectProps,
      children: [
        custom_domains.allow_all_option && /* @__PURE__ */ jsx(Item, { value: null, children: /* @__PURE__ */ jsx(Trans, { message: "All my domains (including default)" }) }, "all"),
        /* @__PURE__ */ jsx(
          Item,
          {
            value: 0,
            startIcon: /* @__PURE__ */ jsx(RemoteFavicon, { url: defaultHost }),
            children: removeProtocol(defaultHost)
          },
          "default"
        ),
        (_a2 = data == null ? void 0 : data.domains) == null ? void 0 : _a2.map((domain) => {
          if (domain.host === defaultHost)
            return null;
          return /* @__PURE__ */ jsx(
            Item,
            {
              value: domain.id,
              startIcon: /* @__PURE__ */ jsx(RemoteFavicon, { url: domain.host }),
              children: removeProtocol(domain.host)
            },
            domain.id
          );
        })
      ]
    }
  );
}
function LinkSettingsForm({
  defaultExpanded,
  multipleLinks,
  hiddenFields = [],
  linkName = /* @__PURE__ */ jsx(Trans, { message: "link" })
}) {
  const {
    links: { retargeting }
  } = useSettings();
  const [expandedValues, setExpandedValues] = useState(
    defaultExpanded || []
  );
  return /* @__PURE__ */ jsxs(
    Accordion,
    {
      className: "-ml-14 -mr-14",
      mode: "multiple",
      variant: "minimal",
      expandedValues,
      onExpandedChange: (values) => {
        setExpandedValues(values);
      },
      children: [
        /* @__PURE__ */ jsx(
          AccordionItem,
          {
            value: "options",
            label: /* @__PURE__ */ jsx(Trans, { message: "Settings" }),
            startIcon: /* @__PURE__ */ jsx(SettingsIcon, {}),
            children: /* @__PURE__ */ jsx(
              LinkOptionsFields,
              {
                multipleLinks,
                hiddenFields,
                linkName
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          AccordionItem,
          {
            value: "restrictions",
            label: /* @__PURE__ */ jsx(Trans, { message: "Restrictions" }),
            startIcon: /* @__PURE__ */ jsx(LockIcon, {}),
            children: /* @__PURE__ */ jsx(LinkRestrictionFields, { linkName })
          }
        ),
        retargeting && /* @__PURE__ */ jsx(
          AccordionItem,
          {
            value: "retargeting",
            label: /* @__PURE__ */ jsx(Trans, { message: "Retargeting" }),
            startIcon: /* @__PURE__ */ jsx(SwapVertIcon, {}),
            children: /* @__PURE__ */ jsx(LinkRetargetingFields, {})
          }
        ),
        !hiddenFields.includes("seo") && /* @__PURE__ */ jsx(
          AccordionItem,
          {
            label: /* @__PURE__ */ jsx(Trans, { message: "SEO" }),
            startIcon: /* @__PURE__ */ jsx(PublicIcon, {}),
            value: "seo",
            children: /* @__PURE__ */ jsx(LinkSeoFields, { hideTitle: hiddenFields == null ? void 0 : hiddenFields.includes("title") })
          }
        ),
        /* @__PURE__ */ jsx(
          AccordionItem,
          {
            value: "utm",
            label: /* @__PURE__ */ jsx(Trans, { message: "UTM" }),
            startIcon: /* @__PURE__ */ jsx(AccountTreeIcon, {}),
            children: /* @__PURE__ */ jsx(LinkUtmFields, {})
          }
        )
      ]
    }
  );
}
function LinkOptionsFields({
  multipleLinks,
  hiddenFields,
  linkName
}) {
  const {
    links: { enable_type, pixels }
  } = useSettings();
  const linkCount = multipleLinks ? 2 : 1;
  const hideGroups = hiddenFields.includes("groups");
  const hideType = hiddenFields.includes("type");
  const hideEnabled = hiddenFields.includes("enabled");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    enable_type && !hideType && /* @__PURE__ */ jsx(LinkTypeField, {}),
    /* @__PURE__ */ jsx(
      LinkDomainSelect,
      {
        name: "domain_id",
        className: "mb-24",
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Select which domain should [one :name|other :names] be accessible with.",
            values: { name: linkName, count: linkCount }
          }
        )
      }
    ),
    !hideGroups && /* @__PURE__ */ jsx(LinkGroupsField, { multipleLinks }),
    pixels && /* @__PURE__ */ jsx(LinkPixelsField, { multipleLinks, linkName }),
    !hideEnabled && /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "active",
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "When [one :name is|other :names are] disabled, 404 page will be shown when short URL is visited.",
            values: { name: linkName, count: linkCount }
          }
        ),
        children: /* @__PURE__ */ jsx(Trans, { message: "Enabled" })
      }
    )
  ] });
}
function LinkGroupsField({ multipleLinks }) {
  const { data } = useLinkFormValueLists();
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      suggestions: data == null ? void 0 : data.groups,
      openMenuOnFocus: true,
      allowCustomValue: false,
      showDropdownArrow: true,
      className: "mb-24",
      name: "groups",
      label: /* @__PURE__ */ jsx(Trans, { message: "Groups" }),
      description: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Which groups should [one link|other these links] belong to.",
          values: { count: multipleLinks ? 2 : 1 }
        }
      ),
      children: (group) => /* @__PURE__ */ jsx(Item, { value: group.id, children: group.name })
    }
  );
}
function LinkPixelsField({ multipleLinks, linkName }) {
  const { data } = useLinkFormValueLists();
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      suggestions: data == null ? void 0 : data.pixels,
      openMenuOnFocus: true,
      className: "mb-24",
      name: "pixels",
      label: /* @__PURE__ */ jsx(Trans, { message: "Pixels" }),
      description: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Which tracking pixels should be used for [one this :name|other these :names].",
          values: { count: multipleLinks ? 2 : 1, name: linkName }
        }
      ),
      children: (pixel) => /* @__PURE__ */ jsx(Item, { value: pixel.id, children: pixel.name })
    }
  );
}
function SlugEditor({
  host,
  value: initialValue = "",
  placeholder,
  onChange,
  className,
  inputRef,
  onInputBlur,
  showLinkIcon = true,
  pattern,
  minLength,
  maxLength,
  hideButton,
  ...props
}) {
  const { base_url } = useSettings();
  const prefix = props.prefix ? `/${props.prefix}` : "";
  const suffix = props.suffix ? `/${props.suffix}` : "";
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  host = host || base_url;
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const handleSubmit = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
      if (value) {
        onChange == null ? void 0 : onChange(value);
      }
    }
  };
  let preview = "";
  if (value) {
    preview = value;
  } else if (placeholder) {
    preview = slugifyString(placeholder);
  }
  return (
    // can't use <form/> here as component might be used inside another form
    /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center", className), children: [
      showLinkIcon && /* @__PURE__ */ jsx(LinkIcon, { className: "icon-md text-muted" }),
      /* @__PURE__ */ jsxs("div", { className: "text-primary ml-6 mr-14", children: [
        host,
        prefix,
        !isEditing && preview && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { children: "/" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: preview })
        ] }),
        !isEditing ? suffix : null
      ] }),
      isEditing && /* @__PURE__ */ jsx(
        TextField,
        {
          pattern,
          minLength,
          maxLength,
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          },
          ref: inputRef,
          "aria-label": "slug",
          autoFocus: true,
          className: "mr-14",
          size: "2xs",
          value,
          onBlur: onInputBlur,
          onChange: (e) => {
            setValue(e.target.value);
          }
        }
      ),
      !hideButton && /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          color: "chip",
          variant: "outline",
          size: "2xs",
          onClick: () => {
            handleSubmit();
          },
          children: isEditing ? /* @__PURE__ */ jsx(Trans, { message: "Save" }) : /* @__PURE__ */ jsx(Trans, { message: "Edit" })
        }
      )
    ] })
  );
}
function AliasField({ form, name }) {
  var _a2, _b2;
  const {
    links: { alias_min, alias_max }
  } = useSettings();
  const { data } = useLinkFormValueLists();
  const defaultHost = useDefaultCustomDomainHost(data == null ? void 0 : data.domains);
  const { disabled } = useLinkFeatureStatus("alias");
  const { watch, setValue, formState } = form;
  const currentAlias = watch("alias") || watch("hash");
  const aliasError = ((_a2 = formState.errors.alias) == null ? void 0 : _a2.message) || ((_b2 = formState.errors.hash) == null ? void 0 : _b2.message);
  return /* @__PURE__ */ jsxs("div", { className: "mb-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(
        SlugEditor,
        {
          host: defaultHost,
          pattern: "[A-Za-z0-9\\-]+",
          minLength: alias_min,
          maxLength: alias_max,
          value: currentAlias,
          onChange: (newAlias) => {
            setValue(name, newAlias, { shouldDirty: true });
          },
          hideButton: disabled
        }
      ),
      disabled && /* @__PURE__ */ jsx(
        NoPermissionButton,
        {
          message: /* @__PURE__ */ jsx(Trans, { message: "Your current plan does not include alias editing." })
        }
      )
    ] }),
    aliasError && /* @__PURE__ */ jsx("div", { className: "mt-6 text-xs text-danger", children: aliasError })
  ] });
}
function CrupdateLinkForm({
  form,
  onSubmit,
  formId,
  showButtonLabelField,
  hiddenFields
}) {
  const { clearErrors } = form;
  const { trans } = useTrans();
  const {
    links: { min_len, max_len }
  } = useSettings();
  const hideAlias = hiddenFields == null ? void 0 : hiddenFields.includes("alias");
  return /* @__PURE__ */ jsxs(
    Form,
    {
      form,
      onSubmit: (values) => {
        if (!urlIsValid(values.long_url)) {
          form.setError("long_url", {
            message: trans(message("This url is invalid."))
          });
        } else {
          onSubmit(values);
        }
      },
      onBeforeSubmit: () => {
        clearErrors("alias");
      },
      id: formId,
      children: [
        showButtonLabelField && /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "name",
            label: /* @__PURE__ */ jsx(Trans, { message: "Button label" }),
            className: "mb-24 flex-auto",
            placeholder: trans(message("e.g. My Webpage")),
            autoFocus: true
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            label: /* @__PURE__ */ jsx(Trans, { message: "Destination URL" }),
            name: "long_url",
            placeholder: "https://example.com",
            autoComplete: "off",
            spellCheck: "false",
            required: true,
            className: clsx(hideAlias ? "mb-24" : "mb-12"),
            autoFocus: !showButtonLabelField,
            minLength: min_len,
            maxLength: max_len
          }
        ),
        !hideAlias && /* @__PURE__ */ jsx(AliasField, { form, name: "alias" }),
        /* @__PURE__ */ jsx(LinkSettingsForm, { hiddenFields })
      ]
    }
  );
}
const placeholderPassword = "********";
function buildLinkeableDefaultFormValues(linkeable) {
  const rules = linkeable.rules || [];
  const defaultUtm = {};
  const customUtm = [];
  if (linkeable.utm) {
    const queryParams = new URLSearchParams(linkeable.utm);
    for (const [key, value] of queryParams.entries()) {
      if (defaultUtmTags.includes(key)) {
        defaultUtm[key] = value;
      } else {
        customUtm.push({ key, value });
      }
    }
  }
  return {
    hash: linkeable.hash,
    active: linkeable.active,
    activates_at: linkeable.activates_at,
    expires_at: linkeable.expires_at,
    name: linkeable.name,
    description: linkeable.description,
    image: linkeable.image,
    geo_rules: rules.filter((rule) => rule.type === "geo"),
    device_rules: rules.filter((rule) => rule.type === "device"),
    platform_rules: rules.filter((rule) => rule.type === "platform"),
    exp_clicks_rule: rules.find((r) => r.type === "exp_clicks"),
    // show an indication to user that password exists
    password: linkeable.has_password ? placeholderPassword : "",
    utm: defaultUtm,
    utm_custom: customUtm,
    domain_id: linkeable.domain_id,
    pixels: linkeable.pixels,
    tags: linkeable.tags
  };
}
const defaultUtmTags = [
  "source",
  "medium",
  "campaign",
  "term",
  "content"
];
function buildLinkeablePayload(values) {
  var _a2;
  if (values.password === placeholderPassword) {
    delete values.password;
  }
  let payload = {
    ...values,
    utm: null,
    groups: null,
    pixels: null,
    tags: null
  };
  payload = addUtmAndCustomQueryParams(payload, values);
  payload.pixels = values.pixels ? values.pixels.map((pixel) => pixel.id) : [];
  payload.tags = (_a2 = values.tags) == null ? void 0 : _a2.map(
    (tag) => typeof tag === "string" ? tag : tag.name
  );
  return payload;
}
function addUtmAndCustomQueryParams(payload, values) {
  var _a2;
  if (!values.utm && !values.utm_custom)
    return payload;
  const utm = removeEmptyValuesFromObject(values.utm || {});
  (_a2 = values.utm_custom) == null ? void 0 : _a2.forEach(({ key, value }) => {
    utm[key] = value;
  });
  payload.utm = new URLSearchParams(utm).toString();
  return payload;
}
function buildLinkPayload(values) {
  var _a2;
  const payload = buildLinkeablePayload(values);
  payload.groups = (_a2 = values.groups) == null ? void 0 : _a2.map((group) => group.id);
  return payload;
}
function useCreateLink(form, { endpoint: endpoint2, invalidateQueries = true } = {}) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => createLink(payload, endpoint2),
    onSuccess: () => {
      toast.positive(trans(message("Link created")));
      if (invalidateQueries) {
        queryClient.invalidateQueries({
          queryKey: DatatableDataQueryKey("link")
        });
        queryClient.invalidateQueries({
          queryKey: DatatableDataQueryKey("link-group")
        });
        queryClient.invalidateQueries({
          queryKey: DatatableDataQueryKey("biolink")
        });
      }
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createLink(values, endpoint2) {
  return apiClient.post(endpoint2 || `link`, buildLinkPayload(values)).then((r) => r.data);
}
function CreateLinkDialog({
  group,
  position: position2,
  showButtonLabelField,
  hiddenFields,
  endpoint: endpoint2,
  onSuccess,
  invalidateQueries
}) {
  const { close, formId } = useDialogContext();
  const {
    links: { default_type },
    custom_domains
  } = useSettings();
  const { verify, isVerifying } = useRecaptcha("link_creation");
  const form = useForm({
    defaultValues: {
      hash: nanoid(5),
      active: true,
      type: default_type || "direct",
      geo_rules: [],
      device_rules: [],
      platform_rules: [],
      // set undefined if no group id specified, so existing groups are not cleared in backend
      groups: group ? [group] : [],
      position: position2,
      // for biolink
      utm: {},
      utm_custom: [],
      domain_id: (custom_domains == null ? void 0 : custom_domains.allow_all_option) ? void 0 : 0
    }
  });
  const createLink2 = useCreateLink(form, { endpoint: endpoint2, invalidateQueries });
  return /* @__PURE__ */ jsxs(Dialog, { size: "lg", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Create link" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateLinkForm,
      {
        hiddenFields,
        showButtonLabelField,
        formId,
        form,
        onSubmit: async (values) => {
          const isValid = await verify();
          if (isValid) {
            createLink2.mutate(values, {
              onSuccess: (response) => {
                onSuccess == null ? void 0 : onSuccess(response);
                close();
              }
            });
          }
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: createLink2.isPending || isVerifying,
          children: /* @__PURE__ */ jsx(Trans, { message: "Create" })
        }
      )
    ] })
  ] });
}
function useUpdateLink(form, linkId, { endpoint: endpoint2, invalidateQueries = true } = {}) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => updateLink(linkId, payload, endpoint2),
    onSuccess: async () => {
      if (invalidateQueries) {
        await Promise.allSettled([
          queryClient.invalidateQueries({
            queryKey: DatatableDataQueryKey("link")
          }),
          queryClient.invalidateQueries({
            queryKey: DatatableDataQueryKey("link-group")
          }),
          queryClient.invalidateQueries({
            queryKey: DatatableDataQueryKey("biolink")
          })
        ]);
      }
      toast.positive(trans(message("Link updated")));
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateLink(id, values, endpoint2) {
  return apiClient.put(endpoint2 || `link/${id}`, buildLinkPayload(values)).then((r) => r.data);
}
function UpdateLinkDialog({
  link,
  showButtonLabelField,
  hiddenFields,
  invalidateQueries,
  onSuccess,
  endpoint: endpoint2
}) {
  const { close, formId } = useDialogContext();
  const { verify, isVerifying } = useRecaptcha("link_creation");
  const defaultValues = useMemo(() => buildDefaultFormValues(link), [link]);
  const form = useForm({
    defaultValues
  });
  const updateLink2 = useUpdateLink(form, link.id, {
    endpoint: endpoint2,
    invalidateQueries
  });
  return /* @__PURE__ */ jsxs(Dialog, { size: "lg", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update link" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateLinkForm,
      {
        hiddenFields,
        showButtonLabelField,
        formId,
        form,
        onSubmit: async (values) => {
          const isValid = await verify();
          if (isValid) {
            updateLink2.mutate(values, {
              onSuccess: (response) => {
                onSuccess == null ? void 0 : onSuccess(response);
                close();
              }
            });
          }
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: updateLink2.isPending || isVerifying,
          children: /* @__PURE__ */ jsx(Trans, { message: "Update" })
        }
      )
    ] })
  ] });
}
function buildDefaultFormValues(link) {
  const values = buildLinkeableDefaultFormValues(link);
  return {
    ...values,
    long_url: link.long_url,
    alias: link.alias,
    type: link.type,
    type_id: link.type_id,
    groups: link.groups
  };
}
function LinkImage({ link, className }) {
  return link.image ? /* @__PURE__ */ jsx("img", { className, alt: "", src: link.image }) : /* @__PURE__ */ jsx(RemoteFavicon, { className, url: link.long_url });
}
function OverQuotaDialog({ resourceName }) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    UpgradeDialog,
    {
      message: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "You've reached the maximum number of :resource allowed for your current plan.",
          values: { resource: trans(resourceName) }
        }
      ),
      messageSuffix: /* @__PURE__ */ jsx(Trans, { message: "Upgrade to increase this limit and unlock other features." })
    }
  );
}
const PermissionAwareButton = forwardRef(({ children, resource, action, ...childProps }, ref) => {
  const { user } = useAuth();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { data } = useLinkSummary();
  const usageKey = useMemo(() => {
    const resourceName = typeof resource === "string" ? resource : resource.model_type;
    return `${camelCaseToSnakeCase(
      resourceName
    )}s`;
  }, [resource]);
  const hasPermission = data == null ? void 0 : data.usage[usageKey][action];
  const messageType = data == null ? void 0 : data.usage[usageKey].createMsgType;
  if (hasPermission || typeof resource === "object" && resource.user_id === (user == null ? void 0 : user.id)) {
    return cloneElement(children, { ...childProps, ref });
  }
  if (!hasPermission && messageType !== "overQuota") {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onPointerDown: createEventHandler((e) => {
        e.preventDefault();
        e.stopPropagation();
      }),
      onClickCapture: createEventHandler((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDialogIsOpen(true);
      }),
      onKeyDownCapture: createEventHandler((event) => {
        const e = event;
        e.preventDefault();
        e.stopPropagation();
        if (e.key === "Enter" || e.key === " ") {
          setDialogIsOpen(true);
        }
      }),
      children: [
        children,
        /* @__PURE__ */ jsx(
          DialogTrigger,
          {
            type: "modal",
            isOpen: dialogIsOpen,
            onOpenChange: setDialogIsOpen,
            children: /* @__PURE__ */ jsx(OverQuotaDialog, { resourceName: resourceTranslationMap[usageKey] })
          }
        )
      ]
    }
  );
});
function camelCaseToSnakeCase(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
const BarChartIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" }),
  "BarChartOutlined"
);
const linksDatatableColumns = [
  {
    key: "summary",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Summary" }),
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    body: (link) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 whitespace-nowrap", children: [
        /* @__PURE__ */ jsx(LinkImage, { link, className: "w-16 h-16" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "block font-semibold hover:underline overflow-ellipsis overflow-hidden w-min",
            href: link.long_url,
            target: "_blank",
            rel: "noreferrer",
            "data-testid": "long-url",
            children: removeProtocol(link.long_url)
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        LinkClipboardButton,
        {
          link,
          variant: "text",
          className: "block text-muted hover:underline w-min",
          "data-testid": "short-url"
        }
      )
    ] })
  },
  {
    key: "user_id",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Owner" }),
    width: "flex-2 min-w-140",
    body: (link) => {
      if (!link.user)
        return "";
      return /* @__PURE__ */ jsx(
        NameWithAvatar,
        {
          image: link.user.avatar,
          label: link.user.display_name,
          description: link.user.email
        }
      );
    }
  },
  {
    key: "clicks",
    sortingKey: "clicks_count",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Clicks" }),
    body: (link) => link.clicks_count ? /* @__PURE__ */ jsx(FormattedNumber, { value: link.clicks_count }) : ""
  },
  {
    key: "type",
    sortingKey: "type",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Type" }),
    body: (link) => /* @__PURE__ */ jsx(Chip, { size: "xs", radius: "rounded", className: "capitalize", children: /* @__PURE__ */ jsx(Trans, { message: link.type }) })
  },
  {
    key: "password",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Password" }),
    body: (link) => link.has_password ? /* @__PURE__ */ jsx(CheckIcon, { className: "icon-md text-positive" }) : /* @__PURE__ */ jsx(CloseIcon, { className: "icon-md text-danger" })
  },
  {
    key: "expires_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Expires at" }),
    body: (link) => link.expires_at ? /* @__PURE__ */ jsx(FormattedDate, { date: link.expires_at }) : ""
  },
  {
    key: "clicked_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last clicked" }),
    body: (link) => link.clicked_at ? /* @__PURE__ */ jsx(FormattedDate, { date: link.clicked_at }) : ""
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-128 flex-shrink-0",
    visibleInMode: "all",
    body: (link) => /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
      /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Link statistics" }), children: /* @__PURE__ */ jsx(Link, { to: `${link.id}`, children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(BarChartIcon, {}) }) }) }),
      /* @__PURE__ */ jsx(ShareLinkButton, { link }),
      /* @__PURE__ */ jsx(PermissionAwareButton, { resource: link, action: "update", children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Edit link" }), children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(EditIcon, {}) }) }),
        /* @__PURE__ */ jsx(UpdateLinkDialog, { link })
      ] }) })
    ] })
  }
];
const AddLinkIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M8 11h8v2H8v-2zm12.1 1H22c0-2.76-2.24-5-5-5h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1zM3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM19 12h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z" }),
  "AddLinkOutlined"
);
const ExportCsvIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M 7 2 C 5.895 2 5 2.895 5 4 L 5 9 L 4 9 C 2.895 9 2 9.895 2 11 L 2 16 C 2 17.105 2.895 18 4 18 L 5 18 L 5 20 C 5 21.105 5.895 22 7 22 L 15.171875 22 L 13.171875 20 L 7 20 L 7 18 L 17 18 L 17 16 C 17 14.895 17.895 14 19 14 L 21 14 L 21 7 L 16 2 L 7 2 z M 7 4 L 15 4 L 15 8 L 19 8 L 19 9 L 7 9 L 7 4 z M 6 11 C 7.105 11 8 11.895 8 13 L 7 13 C 7 12.449 6.551 12 6 12 C 5.449 12 5 12.449 5 13 L 5 14 C 5 14.551 5.449 15 6 15 C 6.551 15 7 14.551 7 14 L 8 14 C 8 15.105 7.105 16 6 16 C 4.895 16 4 15.105 4 14 L 4 13 C 4 11.895 4.895 11 6 11 z M 10.644531 11 C 12.067531 11.041 12.154297 12.282906 12.154297 12.503906 L 11.1875 12.503906 C 11.1875 12.400906 11.204906 11.806641 10.628906 11.806641 C 10.453906 11.806641 10.059844 11.884188 10.089844 12.367188 C 10.118844 12.810188 10.703547 13.019406 10.810547 13.066406 C 11.034547 13.148406 12.141391 13.642391 12.150391 14.650391 C 12.152391 14.864391 12.097062 15.985 10.664062 16 C 9.1050625 16.017 9 14.675438 9 14.398438 L 9.9746094 14.398438 C 9.9746094 14.545438 9.9870625 15.256172 10.664062 15.201172 C 11.071063 15.167172 11.159828 14.87425 11.173828 14.65625 C 11.196828 14.28925 10.846563 14.068625 10.476562 13.890625 C 9.9565625 13.640625 9.1341406 13.333375 9.1191406 12.359375 C 9.1061406 11.482375 9.7505312 10.975 10.644531 11 z M 13 11 L 14.052734 11 L 14.992188 14.646484 L 15.9375 11 L 17 11 L 15.646484 16 L 14.345703 16 L 13 11 z M 19 16 L 19 20 L 16 20 L 20 24 L 24 20 L 21 20 L 21 16 L 19 16 z" })
);
function useCreateMultipleLinks(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (values) => createLinks(values),
    onSuccess: (response) => {
      toast.positive(
        trans(
          message("[one 1 link|other :count links] shortened", {
            values: { count: response.links.length }
          })
        )
      );
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("link")
      });
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("link-group")
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createLinks(values) {
  return apiClient.post("link/batch/shorten", formToPayload(values)).then((r) => r.data);
}
function formToPayload(values) {
  const payload = buildLinkPayload(values);
  const longUrls = values.long_urls.split(/\n/g);
  return {
    ...payload,
    long_urls: longUrls
  };
}
function CreateMultipleLinksDialog({
  group
}) {
  const { trans } = useTrans();
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      active: true,
      type: "direct",
      geo_rules: [],
      device_rules: [],
      platform_rules: [],
      // set undefined if no group id specified, so existing groups are not cleared in backend
      groups: group ? [group] : void 0,
      utm: {},
      utm_custom: []
    }
  });
  const createMultiple = useCreateMultipleLinks(form);
  return /* @__PURE__ */ jsxs(Dialog, { size: "lg", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Shorten links" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form,
      {
        id: formId,
        form,
        onSubmit: (values) => {
          const someUrlsInvalid = values.long_urls.split(/\r?\n/).some((url) => !urlIsValid(url));
          if (someUrlsInvalid) {
            form.setError("long_urls", {
              message: trans(message("Some of the urls are not valid."))
            });
          } else {
            createMultiple.mutate(values, { onSuccess: () => close() });
          }
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              label: /* @__PURE__ */ jsx(Trans, { message: "Multiple URLs (one per line)" }),
              inputElementType: "textarea",
              rows: 10,
              name: "long_urls",
              autoComplete: "off",
              spellCheck: "false",
              required: true,
              className: "mb-24",
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsx(LinkSettingsForm, { multipleLinks: true })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: createMultiple.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Shorten" })
        }
      )
    ] })
  ] });
}
function LinksDatablePage({ forCurrentUser }) {
  const { user } = useAuth();
  const { workspaceId } = useActiveWorkspaceId();
  const { filters, columns } = useMemo(() => {
    const columns2 = !forCurrentUser ? linksDatatableColumns : linksDatatableColumns.filter((col) => col.key !== "user_id");
    const filters2 = !forCurrentUser ? LinksDatatableFilters : LinksDatatableFilters.filter((filter) => filter.key !== "user_id");
    return { filters: filters2, columns: columns2 };
  }, [forCurrentUser]);
  const userId = forCurrentUser ? user == null ? void 0 : user.id : "";
  useEffect(() => {
    prefetchLinkFormValueLists();
  }, []);
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "link",
      queryParams: { userId, workspaceId, with: "user" },
      title: /* @__PURE__ */ jsx(Trans, { message: "Links" }),
      filters,
      columns,
      actions: /* @__PURE__ */ jsx(Actions$7, {}),
      selectedActions: /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "link", action: "delete", children: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}) }),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: shareLink,
          title: /* @__PURE__ */ jsx(Trans, { message: "No links have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching links" })
        }
      )
    }
  );
}
function Actions$7() {
  const exportCsv2 = useExportCsv("link/csv/export");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(MenuTrigger, { children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          variant: "outline",
          color: "primary",
          size: "sm",
          className: "flex-shrink-0",
          children: /* @__PURE__ */ jsx(MoreHorizIcon, {})
        }
      ),
      /* @__PURE__ */ jsxs(Menu, { children: [
        /* @__PURE__ */ jsx(
          Item,
          {
            value: "addMultiple",
            startIcon: /* @__PURE__ */ jsx(AddLinkIcon, {}),
            onSelected: () => {
              openDialog(CreateMultipleLinksDialog);
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Shorten multiple links" })
          }
        ),
        /* @__PURE__ */ jsx(
          Item,
          {
            value: "export",
            startIcon: /* @__PURE__ */ jsx(ExportCsvIcon, {}),
            onSelected: () => {
              exportCsv2.mutate(
                {},
                {
                  onSuccess: (response) => {
                    if (response.downloadPath) {
                      downloadFileFromUrl(response.downloadPath);
                    } else {
                      openDialog(CsvExportInfoDialog);
                    }
                  }
                }
              );
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Export links" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "link", action: "create", children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
      /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Shorten link" }) }),
      /* @__PURE__ */ jsx(CreateLinkDialog, {})
    ] }) })
  ] });
}
const MoveDownIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 11c0 2.45 1.76 4.47 4.08 4.91l-1.49-1.49L7 13l4 4.01L7 21l-1.41-1.41 1.58-1.58v-.06C3.7 17.54 1 14.58 1 11c0-3.87 3.13-7 7-7h3v2H8c-2.76 0-5 2.24-5 5zm19 0V4h-9v7h9zm-2-2h-5V6h5v3zm-7 4h9v7h-9z" }),
  "MoveDownOutlined"
);
function useMoveLinksToGroup(group) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => moveLinks(group.id, payload),
    onSuccess: () => {
      toast.positive(
        trans(
          message("Moved links to “:group“", { values: { group: group.name } })
        )
      );
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("link-group")
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function moveLinks(groupId, payload) {
  return apiClient.post(`link-group/${groupId}/attach`, payload).then((r) => r.data);
}
function MoveLinksToGroupDialog({ group }) {
  const { close } = useDialogContext();
  const [selectedIds, setSelectedIds] = useState([]);
  const [params2, setParams] = useState({
    groupId: `!${group.id}`,
    query: "",
    perPage: 8
  });
  const { data, isLoading } = useDatatableData("link", params2);
  const pagination = data == null ? void 0 : data.pagination;
  const moveLinks2 = useMoveLinksToGroup(group);
  const paginationButtons = /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        disabled: isLoading || !(pagination == null ? void 0 : pagination.prev_page),
        onClick: () => {
          setParams({
            ...params2,
            page: pagination == null ? void 0 : pagination.prev_page
          });
        },
        children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
      }
    ),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        disabled: isLoading || !(pagination == null ? void 0 : pagination.next_page),
        onClick: () => {
          setParams({
            ...params2,
            page: pagination == null ? void 0 : pagination.next_page
          });
        },
        children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
      }
    )
  ] });
  const emptyStageMessage = /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      image: /* @__PURE__ */ jsx(SvgImage, { src: shareLink }),
      title: /* @__PURE__ */ jsx(Trans, { message: "No links found" })
    }
  );
  const list = /* @__PURE__ */ jsx("div", { className: "min-h-[464px]", children: /* @__PURE__ */ jsx(List, { children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: isLoading ? /* @__PURE__ */ jsx(LinksSkeleton, {}) : /* @__PURE__ */ jsx(
    LinksList,
    {
      links: pagination == null ? void 0 : pagination.data,
      selectedIds,
      setSelectedIds
    }
  ) }) }) });
  return /* @__PURE__ */ jsxs(Dialog, { size: "lg", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Move links to “:group“", values: { group: group.name } }) }),
    /* @__PURE__ */ jsxs(DialogBody, { children: [
      /* @__PURE__ */ jsx(
        TextField,
        {
          className: "mb-14",
          label: /* @__PURE__ */ jsx(Trans, { message: "Search for links..." }),
          value: params2.query,
          onChange: (e) => {
            setParams({ ...params2, query: e.target.value });
          }
        }
      ),
      !isLoading && !(pagination == null ? void 0 : pagination.data.length) ? emptyStageMessage : list
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { startAction: paginationButtons, children: [
      /* @__PURE__ */ jsx(Button, { variant: "text", onClick: close, children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          onClick: () => {
            moveLinks2.mutate({ linkIds: selectedIds }, { onSuccess: close });
          },
          disabled: moveLinks2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Move" })
        }
      )
    ] })
  ] });
}
function LinksList({ links, selectedIds, setSelectedIds }) {
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsx(List, { children: (links || []).map((link) => {
    const isSelected = selectedIds.includes(link.id);
    return /* @__PURE__ */ jsx(
      ListItem,
      {
        isSelected,
        onSelected: () => {
          if (isSelected) {
            setSelectedIds(selectedIds.filter((id) => id !== link.id));
          } else {
            setSelectedIds([...selectedIds, link.id]);
          }
        },
        startIcon: /* @__PURE__ */ jsx(Checkbox, { checked: isSelected }),
        description: removeProtocol(link.short_url),
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
          /* @__PURE__ */ jsx(LinkImage, { className: "w-14 h-14", link }),
          /* @__PURE__ */ jsx("div", { children: removeProtocol(link.long_url) })
        ] })
      },
      link.id
    );
  }) }) }, "links-list");
}
const skeletonCount = 8;
function LinksSkeleton() {
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsx(List, { children: Array.from({ length: skeletonCount }).map((_, index) => /* @__PURE__ */ jsx(ListItem, { isDisabled: true, children: /* @__PURE__ */ jsx(Skeleton, { variant: "text", className: "min-h-40" }) }, index)) }) }, "links-skeleton");
}
function LinkGroupsLinksDatatablePage() {
  const { groupId } = useParams();
  return /* @__PURE__ */ jsx("div", { className: "p-12 md:p-24", children: /* @__PURE__ */ jsx(
    DataTable,
    {
      endpoint: `link-group/${groupId}/links`,
      filters: LinksDatatableFilters,
      columns: linksDatatableColumns,
      actions: /* @__PURE__ */ jsx(Actions$6, { groupId: groupId ? +groupId : void 0 }),
      selectedActions: /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "link", action: "delete", children: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}) }),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: shareLink,
          title: /* @__PURE__ */ jsx(Trans, { message: "There are no links in this group yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching links" })
        }
      ),
      children: /* @__PURE__ */ jsx(PageTitle, {})
    }
  ) });
}
function PageTitle() {
  var _a2;
  const navigate = useNavigate$1();
  const { query } = useContext(DataTableContext);
  const linkGroup = (_a2 = query.data) == null ? void 0 : _a2.linkGroup;
  if (!linkGroup)
    return /* @__PURE__ */ jsx(Breadcrumb, { size: "xl", className: "mb-16" });
  const title = /* @__PURE__ */ jsx(Trans, { message: "“:group“ links", values: { group: linkGroup.name } });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: title }),
    /* @__PURE__ */ jsxs(Breadcrumb, { size: "xl", className: "mb-16", children: [
      /* @__PURE__ */ jsx(
        BreadcrumbItem,
        {
          onSelected: () => {
            navigate("/dashboard/link-groups");
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Link groups" })
        }
      ),
      /* @__PURE__ */ jsx(BreadcrumbItem, { className: "first-letter:capitalize", children: title })
    ] })
  ] });
}
function Actions$6({ groupId }) {
  var _a2;
  const exportCsv2 = useExportCsv("link/csv/export");
  const { query } = useContext(DataTableContext);
  const linkGroup = (_a2 = query.data) == null ? void 0 : _a2.linkGroup;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(MenuTrigger, { children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          variant: "outline",
          color: "primary",
          size: "sm",
          className: "flex-shrink-0",
          children: /* @__PURE__ */ jsx(MoreHorizIcon, {})
        }
      ),
      /* @__PURE__ */ jsxs(Menu, { children: [
        /* @__PURE__ */ jsx(
          Item,
          {
            value: "moveLinks",
            startIcon: /* @__PURE__ */ jsx(MoveDownIcon, {}),
            onSelected: () => {
              openDialog(MoveLinksToGroupDialog, { group: linkGroup });
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Move links to this group" })
          }
        ),
        /* @__PURE__ */ jsx(
          Item,
          {
            value: "addMultiple",
            startIcon: /* @__PURE__ */ jsx(AddLinkIcon, {}),
            onSelected: () => {
              openDialog(CreateMultipleLinksDialog, { group: linkGroup });
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Add multiple links" })
          }
        ),
        /* @__PURE__ */ jsx(
          Item,
          {
            value: "export",
            startIcon: /* @__PURE__ */ jsx(ExportCsvIcon, {}),
            onSelected: () => {
              exportCsv2.mutate(
                { groupId },
                {
                  onSuccess: (response) => {
                    if (response.downloadPath) {
                      downloadFileFromUrl(response.downloadPath);
                    } else {
                      openDialog(CsvExportInfoDialog);
                    }
                  }
                }
              );
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Export links" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "link", action: "create", children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
      /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Add link" }) }),
      /* @__PURE__ */ jsx(CreateLinkDialog, { group: linkGroup })
    ] }) })
  ] });
}
const ListAltIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 7h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zM20.1 3H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM19 19H5V5h14v14z" }),
  "ListAltOutlined"
);
function CrupdateLinkGroupForm({
  onSubmit,
  form,
  formId
}) {
  const { clearErrors } = form;
  return /* @__PURE__ */ jsxs(
    Form,
    {
      form,
      id: formId,
      onBeforeSubmit: () => {
        clearErrors("hash");
      },
      onSubmit,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-24", children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "name",
              label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
              minLength: 3,
              className: "mb-8",
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsx(AliasField, { form, name: "hash" })
        ] }),
        /* @__PURE__ */ jsx(LinkDomainSelect, { name: "domain_id", className: "mb-24" }),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "description",
            className: "mb-24",
            label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
            inputElementType: "textarea",
            rows: 2
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "active",
            description: /* @__PURE__ */ jsx(Trans, { message: "Whether this link group is viewable publicly." }),
            className: "mb-24",
            children: /* @__PURE__ */ jsx(Trans, { message: "Active" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "rotator",
            description: /* @__PURE__ */ jsx(Trans, { message: "When checked, url above will redirect to random link from the group, instead of showing all links belonging to group." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Rotator" })
          }
        )
      ]
    }
  );
}
function useUpdateLinkGroup(form, groupId) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => updateLinkGroup(groupId, payload),
    onSuccess: () => {
      toast.positive(trans(message("Link group updated")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("link-group")
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateLinkGroup(id, payload) {
  return apiClient.put(`link-group/${id}`, payload).then((r) => r.data);
}
function UpdateLinkGroupDialog({ group }) {
  const { verify, isVerifying } = useRecaptcha("link_creation");
  const { formId, close } = useDialogContext();
  const form = useForm({
    defaultValues: {
      name: group.name,
      hash: group.hash,
      description: group.description,
      active: group.active,
      rotator: group.rotator
    }
  });
  const updateGroup = useUpdateLinkGroup(form, group.id);
  return /* @__PURE__ */ jsxs(Dialog, { size: "md", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update link group" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateLinkGroupForm,
      {
        formId,
        form,
        onSubmit: async (values) => {
          const isValid = await verify();
          if (isValid) {
            updateGroup.mutate(values, { onSuccess: () => close() });
          }
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: updateGroup.isPending || isVerifying,
          children: /* @__PURE__ */ jsx(Trans, { message: "Update" })
        }
      )
    ] })
  ] });
}
const LinkGroupsDatatableColumns = [
  {
    key: "name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    body: (group) => /* @__PURE__ */ jsx(
      "a",
      {
        href: group.short_url,
        target: "_blank",
        rel: "noreferrer",
        className: LinkStyle,
        children: group.name
      }
    )
  },
  {
    key: "user_id",
    allowsSorting: true,
    width: "flex-2 min-w-140",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Owner" }),
    body: (group) => {
      if (!group.user)
        return "";
      return /* @__PURE__ */ jsx(
        NameWithAvatar,
        {
          image: group.user.avatar,
          label: group.user.display_name,
          description: group.user.email
        }
      );
    }
  },
  {
    key: "links_count",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Links" }),
    body: (group) => group.links_count ? /* @__PURE__ */ jsx(FormattedNumber, { value: group.links_count }) : "-"
  },
  {
    key: "active",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Active" }),
    body: (group) => group.active ? /* @__PURE__ */ jsx(CheckIcon, { className: "icon-md text-positive" }) : /* @__PURE__ */ jsx(CloseIcon, { className: "icon-md text-danger" })
  },
  {
    key: "rotator",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Rotator" }),
    body: (group) => group.rotator ? /* @__PURE__ */ jsx(CheckIcon, { className: "icon-md text-positive" }) : /* @__PURE__ */ jsx(CloseIcon, { className: "icon-md text-danger" })
  },
  {
    key: "updated_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (link) => link.updated_at ? /* @__PURE__ */ jsx(FormattedDate, { date: link.updated_at }) : ""
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-160 flex-shrink-0",
    visibleInMode: "all",
    body: (group) => /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
      /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Clicks report" }), children: /* @__PURE__ */ jsx(Link, { to: `${group.id}`, children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(BarChartIcon, {}) }) }) }),
      /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Manage links" }), children: /* @__PURE__ */ jsx(Link, { to: `${group.id}/links`, children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(ListAltIcon, {}) }) }) }),
      /* @__PURE__ */ jsx(ShareLinkButton, { link: group }),
      /* @__PURE__ */ jsx(PermissionAwareButton, { resource: group, action: "update", children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Edit link" }), children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(EditIcon, {}) }) }),
        /* @__PURE__ */ jsx(UpdateLinkGroupDialog, { group })
      ] }) })
    ] })
  }
];
const LinkGroupsDatatableFilters = [
  {
    key: "rotator",
    label: message("Type"),
    defaultOperator: FilterOperator.eq,
    description: message("Type of the group"),
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("Default"),
          value: false
        },
        {
          key: "02",
          label: message("Rotator"),
          value: true
        }
      ]
    }
  },
  {
    key: "active",
    label: message("Status"),
    description: message("Whether group is disabled or not"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("Enabled"),
          value: true
        },
        {
          key: "02",
          label: message("Disabled"),
          value: false
        }
      ]
    }
  },
  {
    key: "links_count",
    label: message("Link count"),
    description: message("Number of links in the group"),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: "number",
      defaultValue: 1
    }
  },
  createdAtFilter({
    description: message("Date group was created")
  }),
  updatedAtFilter({
    description: message("Date group was last updated")
  }),
  {
    key: "user_id",
    label: message("User"),
    description: message("User group was created by"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL
    }
  }
];
function useCreateLinkGroup(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => createLinkGroup$1(props),
    onSuccess: () => {
      toast.positive(trans(message("Link group created")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("link-group")
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createLinkGroup$1(payload) {
  return apiClient.post(`link-group`, payload).then((r) => r.data);
}
function CreateLinkGroupDialog() {
  const { formId, close } = useDialogContext();
  const { custom_domains } = useSettings();
  const { verify, isVerifying } = useRecaptcha("link_creation");
  const form = useForm({
    defaultValues: {
      active: true,
      hash: nanoid(6),
      rotator: false,
      domain_id: (custom_domains == null ? void 0 : custom_domains.allow_all_option) ? void 0 : 0
    }
  });
  const createGroup = useCreateLinkGroup(form);
  return /* @__PURE__ */ jsxs(Dialog, { size: "md", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Create link group" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateLinkGroupForm,
      {
        formId,
        form,
        onSubmit: async (values) => {
          const isValid = await verify();
          if (isValid) {
            createGroup.mutate(values, { onSuccess: () => close() });
          }
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: createGroup.isPending || isVerifying,
          children: /* @__PURE__ */ jsx(Trans, { message: "Create" })
        }
      )
    ] })
  ] });
}
function LinkGroupsDatatablePage({
  forCurrentUser
}) {
  const { user } = useAuth();
  const { workspaceId } = useActiveWorkspaceId();
  const { filters, columns } = useMemo(() => {
    const columns2 = !forCurrentUser ? LinkGroupsDatatableColumns : LinkGroupsDatatableColumns.filter((col) => col.key !== "user_id");
    const filters2 = !forCurrentUser ? LinkGroupsDatatableFilters : LinkGroupsDatatableFilters.filter((filter) => filter.key !== "user_id");
    return { filters: filters2, columns: columns2 };
  }, [forCurrentUser]);
  useEffect(() => {
    prefetchLinkFormValueLists();
  }, []);
  const userId = forCurrentUser ? user == null ? void 0 : user.id : "";
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "link-group",
      queryParams: {
        userId,
        withCount: "links",
        with: "user,domain",
        workspaceId
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Link groups" }),
      headerContent: /* @__PURE__ */ jsx(InfoTrigger$5, {}),
      headerItemsAlign: "items-center",
      filters,
      columns,
      actions: /* @__PURE__ */ jsx(Actions$5, {}),
      selectedActions: /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "linkGroup", action: "delete", children: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}) }),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: shareLink,
          title: /* @__PURE__ */ jsx(Trans, { message: "No groups have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching groups" })
        }
      )
    }
  );
}
function InfoTrigger$5() {
  return /* @__PURE__ */ jsx(
    InfoDialogTrigger,
    {
      dialogSize: "auto",
      title: /* @__PURE__ */ jsx(Trans, { message: "Group links together to:" }),
      body: /* @__PURE__ */ jsxs("ul", { className: "list-inside list-disc whitespace-nowrap", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Trans, { message: "Simplify multiple link management." }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Trans, { message: "View aggregated clicks report for the whole group." }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Trans, { message: "Redirect to a random link from within the group." }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Trans, { message: "Share all links in the group with one link." }) })
      ] })
    }
  );
}
function Actions$5() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DataTableExportCsvButton, { endpoint: "link-group/csv/export" }),
    /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "linkGroup", action: "create", children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
      /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "New group" }) }),
      /* @__PURE__ */ jsx(CreateLinkGroupDialog, {})
    ] }) })
  ] });
}
function useLinkGroup(groupId) {
  return useQuery({
    queryKey: ["link-group", groupId],
    queryFn: () => fetchLinkGroup(groupId),
    initialData: seedInitialDataFromPaginatedList$2(groupId)
  });
}
function fetchLinkGroup(groupId) {
  return apiClient.get(`link-group/${groupId}`).then((response) => response.data);
}
function seedInitialDataFromPaginatedList$2(groupId) {
  var _a2, _b2;
  const linkGroup = (_b2 = (_a2 = queryClient.getQueryData(
    DatatableDataQueryKey("link-group")
  )) == null ? void 0 : _a2.pagination) == null ? void 0 : _b2.data.find((link) => link.id === +groupId);
  return linkGroup ? { linkGroup } : void 0;
}
function LinkGroupClicksReportPage() {
  var _a2;
  const navigate = useNavigate$1();
  const { groupId } = useParams();
  const query = useLinkGroup(groupId);
  const group = (_a2 = query.data) == null ? void 0 : _a2.linkGroup;
  return /* @__PURE__ */ jsx(
    ClicksReportPageLayout,
    {
      model: `link-group=${groupId}`,
      title: /* @__PURE__ */ jsxs(Breadcrumb, { size: "xl", className: clsx(query.isLoading && "invisible"), children: [
        /* @__PURE__ */ jsx(
          BreadcrumbItem,
          {
            onSelected: () => {
              navigate("..", { relative: "path" });
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Link groups" })
          }
        ),
        /* @__PURE__ */ jsx(BreadcrumbItem, { className: "first-letter:capitalize", children: /* @__PURE__ */ jsx(Trans, { message: "“:name“ clicks", values: { name: group == null ? void 0 : group.name } }) })
      ] }),
      actions: group && /* @__PURE__ */ jsx(ShareLinkButton, { className: "flex-shrink-0 text-muted", link: group })
    }
  );
}
function useLink(linkId) {
  return useQuery({
    queryKey: ["link", linkId],
    queryFn: () => fetchLink(linkId),
    initialData: seedInitialDataFromPaginatedList$1(linkId)
  });
}
function fetchLink(linkId) {
  return apiClient.get(`link/${linkId}`).then((response) => response.data);
}
function seedInitialDataFromPaginatedList$1(linkId) {
  var _a2, _b2;
  const link = (_b2 = (_a2 = queryClient.getQueryData(DatatableDataQueryKey("link"))) == null ? void 0 : _a2.pagination) == null ? void 0 : _b2.data.find((link2) => link2.id === +linkId);
  return link ? { link } : void 0;
}
function LinkClicksReportPage() {
  var _a2;
  const navigate = useNavigate$1();
  const { linkId } = useParams();
  const query = useLink(linkId);
  const link = (_a2 = query.data) == null ? void 0 : _a2.link;
  return /* @__PURE__ */ jsx(
    ClicksReportPageLayout,
    {
      model: `link=${linkId}`,
      title: /* @__PURE__ */ jsxs(Breadcrumb, { size: "xl", className: clsx(query.isLoading && "invisible"), children: [
        /* @__PURE__ */ jsx(
          BreadcrumbItem,
          {
            onSelected: () => {
              navigate("..", { relative: "path" });
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Links" })
          }
        ),
        /* @__PURE__ */ jsx(BreadcrumbItem, { className: "first-letter:capitalize", children: /* @__PURE__ */ jsx(Trans, { message: "“:name“ clicks", values: { name: link == null ? void 0 : link.name } }) })
      ] }),
      actions: link && /* @__PURE__ */ jsx(ShareLinkButton, { className: "flex-shrink-0 text-muted", link })
    }
  );
}
const world = "/assets/world-ea41c34b.svg";
function DomainsEmptyStateMessage(props) {
  return /* @__PURE__ */ jsx(
    DataTableEmptyStateMessage,
    {
      ...props,
      image: world,
      title: /* @__PURE__ */ jsx(Trans, { message: "No domains have been connected yet" }),
      filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching domains" })
    }
  );
}
function BooleanIndicator({ value }) {
  if (value) {
    return /* @__PURE__ */ jsx(CheckIcon, { className: "icon-md text-positive" });
  }
  return /* @__PURE__ */ jsx(CloseIcon, { className: "icon-md text-danger" });
}
function useDeleteDomain() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => deleteDomain(props),
    onSuccess: (response, props) => {
      toast.positive(
        trans(
          message("“:domain” removed", {
            values: { domain: removeProtocol(props.domain.host) }
          })
        )
      );
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("custom-domain")
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function deleteDomain({ domain }) {
  return apiClient.delete(`custom-domain/${domain.id}`).then((r) => r.data);
}
function DeleteDomainButton({ domain }) {
  const deleteDomain2 = useDeleteDomain();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (isConfirmed) => {
        if (isConfirmed) {
          deleteDomain2.mutate({ domain });
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            color: "danger",
            size: "xs",
            disabled: deleteDomain2.isPending,
            children: /* @__PURE__ */ jsx(Trans, { message: "Remove" })
          }
        ),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            title: /* @__PURE__ */ jsx(Trans, { message: "Remove domain?" }),
            body: /* @__PURE__ */ jsx(
              Trans,
              {
                message: "Are you sure you want to remove “:domain“?",
                values: { domain: domain.host }
              }
            ),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Remove" }),
            isDanger: true
          }
        )
      ]
    }
  );
}
const domainsDatatableColumns = [
  {
    key: "host",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Domain" }),
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    body: (domain) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 whitespace-nowrap", children: [
      /* @__PURE__ */ jsx(RemoteFavicon, { url: domain.host }),
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "block font-semibold hover:underline overflow-ellipsis overflow-hidden w-min",
          href: domain.host,
          target: "_blank",
          rel: "noreferrer",
          "data-testid": "host-name",
          children: domain.host
        }
      )
    ] }) })
  },
  {
    key: "user_id",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Owner" }),
    width: "flex-2 min-w-140",
    body: (domain) => {
      if (!domain.user)
        return "";
      return /* @__PURE__ */ jsx(
        NameWithAvatar,
        {
          image: domain.user.avatar,
          label: domain.user.display_name,
          description: domain.user.email
        }
      );
    }
  },
  {
    key: "global",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Global" }),
    body: (domain) => /* @__PURE__ */ jsx(BooleanIndicator, { value: domain.global })
  },
  {
    key: "updated_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (domain) => domain.updated_at ? /* @__PURE__ */ jsx(FormattedDate, { date: domain.updated_at }) : ""
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    width: "w-80 flex-shrink-0",
    visibleInMode: "all",
    align: "end",
    body: (domain) => /* @__PURE__ */ jsx(DeleteDomainButton, { domain })
  }
];
const DomainsDatatableFilters = [
  {
    key: "global",
    label: message("Global"),
    description: message("Whether domain is marked as global"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.BooleanToggle,
      defaultValue: true
    }
  },
  createdAtFilter({
    description: message("Date domain was created")
  }),
  updatedAtFilter({
    description: message("Date domain was last updated")
  }),
  {
    key: "user_id",
    label: message("Owner"),
    description: message("User domain belongs to"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL
    }
  }
];
function isSubdomain(host) {
  return (host.replace("www.", "").match(/\./g) || []).length > 1;
}
function DomainProgressIndicator({
  message: message2 = /* @__PURE__ */ jsx(Trans, { message: "Checking DNS configuration..." })
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-18 text-base p-12 rounded bg-primary/10 text-primary", children: [
    /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, size: "sm" }),
    /* @__PURE__ */ jsx("div", { children: message2 })
  ] });
}
function InfoStep({
  stepper: {
    state: { isLoading, host, serverIp }
  }
}) {
  const { base_url } = useSettings();
  if (isLoading) {
    return /* @__PURE__ */ jsx(DomainProgressIndicator, {});
  }
  if (isSubdomain(host)) {
    return /* @__PURE__ */ jsx(
      Message,
      {
        title: /* @__PURE__ */ jsx(Trans, { message: "Add this CNAME record to your domain by visiting your DNS provider or registrar." }),
        record: "CNAME",
        target: base_url
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Message,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Add this A record to your domain by visiting your DNS provider or registrar." }),
      record: "A",
      target: serverIp
    }
  );
}
function Message({ title, record, target }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "text-muted mb-10", children: title }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12 text-base p-12 rounded bg-primary/10 text-primary font-semibold", children: [
      /* @__PURE__ */ jsx("div", { children: record }),
      target
    ] })
  ] });
}
function HostStep({ stepper }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        autoFocus: true,
        name: "host",
        required: true,
        maxLength: 100,
        label: /* @__PURE__ */ jsx(Trans, { message: "Host" }),
        placeholder: "https://example.com",
        description: /* @__PURE__ */ jsx(Trans, { message: "Enter the exact domain name you want your items to be accessible with. It can be a subdomain (example.yourdomain.com) or root domain (yourdomain.com)." })
      }
    ),
    stepper.showGlobalField && /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mt-24 border-t pt-24",
        name: "global",
        description: /* @__PURE__ */ jsx(Trans, { message: "Whether all users should be able to select this domain." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Global" })
      }
    )
  ] });
}
var ConnectDomainStep = /* @__PURE__ */ ((ConnectDomainStep2) => {
  ConnectDomainStep2[ConnectDomainStep2["Host"] = 1] = "Host";
  ConnectDomainStep2[ConnectDomainStep2["Info"] = 2] = "Info";
  ConnectDomainStep2[ConnectDomainStep2["ValidationFailed"] = 3] = "ValidationFailed";
  ConnectDomainStep2[ConnectDomainStep2["Finalize"] = 4] = "Finalize";
  return ConnectDomainStep2;
})(ConnectDomainStep || {});
function useValidateDomainDns() {
  return useMutation({
    mutationFn: (props) => authorize$1(props)
  });
}
function authorize$1(payload) {
  return apiClient.post("secure/custom-domain/validate/2BrM45vvfS/api", payload).then((r) => r.data);
}
function ValidationFailedStep({
  stepper: {
    goToNextStep,
    state: { host, serverIp, isLoading, validationFailReason }
  }
}) {
  useValidateDomainDns();
  const { base_url } = useSettings();
  const { hasPermission } = useAuth();
  const subdomain = isSubdomain(host);
  const record = subdomain ? "CNAME" : "A";
  const location = subdomain ? base_url : serverIp;
  if (isLoading) {
    return /* @__PURE__ */ jsx(DomainProgressIndicator, {});
  }
  const errorMessage = validationFailReason === "serverNotConfigured" && hasPermission("admin") ? /* @__PURE__ */ jsx(ErrorMessage, { children: /* @__PURE__ */ jsx(
    Trans,
    {
      message: "DNS records for the domain are setup, however it seems that your server is not configured to handle requests from “:host“",
      values: { host: location }
    }
  ) }) : /* @__PURE__ */ jsx(ErrorMessage, { children: /* @__PURE__ */ jsx(
    Trans,
    {
      message: "The domain is missing :record record pointing to :location or the changes haven't propagated yet.",
      values: { record, location }
    }
  ) });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    errorMessage,
    /* @__PURE__ */ jsx("div", { className: "whitespace-nowrap text-xs text-muted mt-10", children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "You can wait and try again later, or <b>refresh</b>",
        values: {
          b: (text) => /* @__PURE__ */ jsx(
            "button",
            {
              disabled: isLoading,
              type: "button",
              className: "text-primary underline",
              onClick: () => {
                goToNextStep();
              },
              children: text
            }
          )
        }
      }
    ) })
  ] });
}
function ErrorMessage({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12 text-base p-12 rounded bg-warning/15 text-warning font-medium", children: [
    /* @__PURE__ */ jsx(WarningIcon, { size: "lg" }),
    children
  ] });
}
function useAuthorizeDomainConnect(form) {
  return useMutation({
    mutationFn: (props) => authorize(props),
    onError: (err) => onFormQueryError(err, form)
  });
}
function authorize(payload) {
  return apiClient.post("secure/custom-domain/authorize/store", payload).then((r) => r.data);
}
function useConnectDomain() {
  const { trans } = useTrans();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: (props) => connectDomain(props),
    onSuccess: (response) => {
      toast.positive(
        trans(
          message("“:domain” connected", {
            values: { domain: response.domain.host }
          })
        )
      );
      queryClient2.invalidateQueries({
        queryKey: DatatableDataQueryKey("custom-domain")
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function connectDomain(payload) {
  return apiClient.post("custom-domain", payload).then((r) => r.data);
}
function useConnectDomainStepper({
  showGlobalField
}) {
  const { close } = useDialogContext();
  const form = useForm();
  const authorizeDomainConnect = useAuthorizeDomainConnect(form);
  const validateDns = useValidateDomainDns();
  const connectDomain2 = useConnectDomain();
  const [state, setState] = useState({
    isLoading: false,
    currentStep: ConnectDomainStep.Host,
    host: "",
    serverIp: ""
  });
  const startLoading = () => {
    setState({
      ...state,
      isLoading: true
    });
  };
  const handleDomainValidation = () => {
    return new Promise((resolve) => {
      validateDns.mutate(
        { host: state.host },
        {
          onSuccess: () => {
            resolve({
              status: "success",
              newState: { validationFailReason: void 0 }
            });
          },
          onError: (err) => {
            var _a2;
            resolve({
              status: "error",
              newState: {
                validationFailReason: (_a2 = err.response) == null ? void 0 : _a2.data.failReason
              }
            });
          }
        }
      );
    });
  };
  const handleDomainAuthorization = () => {
    return new Promise((resolve) => {
      authorizeDomainConnect.mutate(form.getValues(), {
        onSuccess: (response) => {
          resolve({
            status: "success",
            newState: {
              host: form.getValues().host,
              serverIp: response.serverIp
            }
          });
        },
        onError: () => {
          resolve({ status: "error" });
        }
      });
    });
  };
  const hasPreviousStep = state.currentStep !== ConnectDomainStep.Host;
  const goToPreviousStep = () => {
    if (!hasPreviousStep || state.isLoading)
      return;
    if (state.currentStep === ConnectDomainStep.Info) {
      setState({
        ...state,
        currentStep: ConnectDomainStep.Host
      });
    } else if (state.currentStep === ConnectDomainStep.ValidationFailed) {
      setState({
        ...state,
        currentStep: ConnectDomainStep.Info
      });
    }
  };
  const goToNextStep = async () => {
    if (state.currentStep === ConnectDomainStep.Host) {
      startLoading();
      const result = await handleDomainAuthorization();
      setState({
        ...state,
        ...result.newState,
        isLoading: false,
        currentStep: result.status === "success" ? ConnectDomainStep.Info : ConnectDomainStep.Host
      });
    } else if (state.currentStep === ConnectDomainStep.Info || state.currentStep === ConnectDomainStep.ValidationFailed) {
      startLoading();
      const validationResult = await handleDomainValidation();
      const nextStep = validationResult.status === "success" ? ConnectDomainStep.Finalize : ConnectDomainStep.ValidationFailed;
      setState({
        ...state,
        ...validationResult.newState,
        isLoading: false,
        currentStep: nextStep
      });
      if (nextStep === ConnectDomainStep.Finalize) {
        connectDomain2.mutate(form.getValues(), {
          onSettled: (response) => {
            close(response == null ? void 0 : response.domain);
          }
        });
      }
    }
  };
  return {
    form,
    state,
    goToNextStep,
    hasPreviousStep,
    goToPreviousStep,
    showGlobalField
  };
}
function FinalizeStep() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      DomainProgressIndicator,
      {
        message: /* @__PURE__ */ jsx(Trans, { message: "Connecting domain..." })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "text-muted mt-10 text-xs", children: /* @__PURE__ */ jsx(Trans, { message: "Don't close this window until domain is connected." }) })
  ] });
}
function ConnectDomainDialog({
  showGlobalField
}) {
  const { close, formId } = useDialogContext();
  const stepper = useConnectDomainStepper({ showGlobalField });
  const StepComponent = getStepComponent(stepper.state.currentStep);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Connect domain" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        form: stepper.form,
        id: formId,
        onSubmit: () => {
          stepper.goToNextStep();
        },
        children: /* @__PURE__ */ jsx(StepComponent, { stepper })
      }
    ) }),
    /* @__PURE__ */ jsxs(
      DialogFooter,
      {
        startAction: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "text",
            onClick: () => {
              close();
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
          }
        ),
        children: [
          stepper.hasPreviousStep && /* @__PURE__ */ jsx(
            Button,
            {
              startIcon: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {}),
              color: "primary",
              variant: "text",
              onClick: () => {
                stepper.goToPreviousStep();
              },
              disabled: stepper.state.isLoading,
              children: /* @__PURE__ */ jsx(Trans, { message: "Previous" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "flat",
              color: "primary",
              type: "submit",
              form: formId,
              endIcon: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {}),
              disabled: stepper.state.isLoading,
              children: /* @__PURE__ */ jsx(Trans, { message: "Next" })
            }
          )
        ]
      }
    )
  ] });
}
function getStepComponent(step) {
  switch (step) {
    case ConnectDomainStep.Host:
      return HostStep;
    case ConnectDomainStep.Info:
      return InfoStep;
    case ConnectDomainStep.ValidationFailed:
      return ValidationFailedStep;
    case ConnectDomainStep.Finalize:
      return FinalizeStep;
  }
}
const datatableColumns = domainsDatatableColumns.map((col) => {
  if (col.key === "actions") {
    return {
      ...col,
      body: (domain) => /* @__PURE__ */ jsx(PermissionAwareButton, { resource: domain, action: "delete", children: /* @__PURE__ */ jsx(DeleteDomainButton, { domain }) })
    };
  }
  return col;
});
function DomainsDatatablePage({
  forCurrentUser
}) {
  const { user } = useAuth();
  const { workspaceId } = useActiveWorkspaceId();
  const { filters, columns } = useMemo(() => {
    const columns2 = !forCurrentUser ? datatableColumns : datatableColumns.filter((col) => col.key !== "user_id");
    const filters2 = !forCurrentUser ? DomainsDatatableFilters : DomainsDatatableFilters.filter((filter) => filter.key !== "user_id");
    return { filters: filters2, columns: columns2 };
  }, [forCurrentUser]);
  const userId = forCurrentUser ? user == null ? void 0 : user.id : "";
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      enableSelection: false,
      endpoint: "custom-domain",
      queryParams: { userId, workspaceId, with: "user" },
      title: /* @__PURE__ */ jsx(Trans, { message: "Branded domains" }),
      headerContent: /* @__PURE__ */ jsx(InfoTrigger$4, {}),
      headerItemsAlign: "items-center",
      filters,
      columns,
      actions: /* @__PURE__ */ jsx(Actions$4, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(DomainsEmptyStateMessage, {})
    }
  );
}
function Actions$4() {
  const { hasPermission } = useAuth();
  return /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "customDomain", action: "create", children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Connect domain" }) }),
    /* @__PURE__ */ jsx(ConnectDomainDialog, { showGlobalField: hasPermission("admin") })
  ] }) });
}
function InfoTrigger$4() {
  return /* @__PURE__ */ jsx(
    InfoDialogTrigger,
    {
      body: /* @__PURE__ */ jsx(Trans, { message: "Create trusted links with your own branded domains. Once connected, you can set the domain as default or only use it for specific links." })
    }
  );
}
const SupportedTrackingPixels = [
  {
    name: "facebook",
    type: "number",
    docsUrl: "https://www.facebook.com/business/help/952192354843755?id=1205376682832142"
  },
  {
    name: "twitter",
    type: "number",
    docsUrl: "https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html"
  },
  {
    name: "google-tag-manager",
    type: "text",
    pattern: "GTM-[a-zA-Z0-9]+",
    docsUrl: "https://tagmanager.google.com"
  },
  {
    name: "google-analytics",
    type: "text",
    docsUrl: "https://analytics.google.com"
  },
  {
    name: "adwords",
    type: "number",
    docsUrl: "https://ads.google.com"
  },
  {
    name: "bing",
    type: "number",
    docsUrl: "https://about.ads.microsoft.com/en-us/solutions/tools/universal-event-tracking"
  },
  {
    name: "pinterest",
    type: "number",
    docsUrl: "https://help.pinterest.com/en/business/article/track-conversions-with-pinterest-tag"
  },
  {
    name: "linkedin",
    type: "text",
    docsUrl: "https://www.linkedin.com/help/lms/answer/a418880/add-the-linkedin-insight-tag-to-your-website"
  },
  {
    name: "quora",
    type: "text",
    pattern: "[a-z0-9]+",
    docsUrl: "https://quoraadsupport.zendesk.com/hc/en-us/articles/115010303387-About-the-Quora-Pixel"
  },
  {
    name: "adroll",
    type: "text",
    docsUrl: "https://help.adroll.com/hc/en-us/articles/211846018-What-is-the-AdRoll-Pixel"
  },
  {
    name: "nexus-segment",
    type: "text",
    docsUrl: "https://segment.com/catalog/integrations/appnexus"
  },
  {
    name: "custom",
    type: "text"
  }
];
const HelpOutlineIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" }),
  "HelpOutlineOutlined"
);
function CrupdatePixelForm({
  formId,
  form,
  onSubmit
}) {
  const { watch } = form;
  const type = watch("type");
  const config = SupportedTrackingPixels.find((p) => p.name === type);
  return /* @__PURE__ */ jsxs(Form, { id: formId, form, onSubmit, children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        autoFocus: true,
        required: true,
        name: "name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        className: "mb-24"
      }
    ),
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        name: "type",
        selectionMode: "single",
        className: "mb-24",
        label: /* @__PURE__ */ jsx(Trans, { message: "Type" }),
        description: (config == null ? void 0 : config.docsUrl) ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsx(HelpOutlineIcon, { size: "sm" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              "data-testid": "pixel-docs-link",
              href: config.docsUrl,
              target: "_blank",
              rel: "noreferrer",
              className: "underline",
              children: /* @__PURE__ */ jsx(Trans, { message: "More information" })
            }
          )
        ] }) : null,
        children: SupportedTrackingPixels.map((pixel) => /* @__PURE__ */ jsx(
          Item,
          {
            capitalizeFirst: true,
            value: pixel.name,
            startIcon: pixel.docsUrl ? /* @__PURE__ */ jsx(RemoteFavicon, { url: pixel.docsUrl }) : /* @__PURE__ */ jsx(TuneIcon, { size: "xs" }),
            children: pixel.name
          },
          pixel.name
        ))
      }
    ),
    type !== "custom" && /* @__PURE__ */ jsx(
      FormTextField,
      {
        required: true,
        pattern: config == null ? void 0 : config.pattern,
        type: (config == null ? void 0 : config.type) === "number" ? "number" : "text",
        name: "pixel_id",
        label: /* @__PURE__ */ jsx(Trans, { message: "Pixel ID" })
      }
    ),
    type === "custom" && /* @__PURE__ */ jsx(CustomCodeFields, {})
  ] });
}
function CustomCodeFields() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "head_code",
        label: /* @__PURE__ */ jsx(Trans, { message: "Custom code for page head" }),
        className: "mb-24",
        inputElementType: "textarea",
        rows: 5
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "body_code",
        label: /* @__PURE__ */ jsx(Trans, { message: "Custom code for page body" }),
        inputElementType: "textarea",
        rows: 5
      }
    )
  ] });
}
function useUpdatePixel(pixelId, form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => createPixel$1(pixelId, props),
    onSuccess: () => {
      toast.positive(trans(message("Pixel updated")));
      queryClient.invalidateQueries({ queryKey: DatatableDataQueryKey("tp") });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createPixel$1(pixelId, payload) {
  return apiClient.put(`tp/${pixelId}`, payload).then((r) => r.data);
}
function UpdatePixelDialog({ pixel }) {
  const form = useForm({
    defaultValues: {
      name: pixel.name,
      type: pixel.type,
      pixel_id: pixel.pixel_id,
      head_code: pixel.head_code,
      body_code: pixel.body_code
    }
  });
  const { formId, close } = useDialogContext();
  const updatePixel = useUpdatePixel(pixel.id, form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update “:name“", values: { name: pixel.name } }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdatePixelForm,
      {
        formId,
        form,
        onSubmit: (values) => {
          updatePixel.mutate(values, {
            onSuccess: () => {
              close();
            }
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: updatePixel.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Update" })
        }
      )
    ] })
  ] });
}
const TrackingPixelsDatatableColumns = [
  {
    key: "name",
    allowsSorting: true,
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    body: (pixel) => pixel.name
  },
  {
    key: "type",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Type" }),
    body: (pixel) => {
      var _a2;
      const docsUrl = (_a2 = SupportedTrackingPixels.find(
        (p) => p.name === pixel.type
      )) == null ? void 0 : _a2.docsUrl;
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10", children: [
        docsUrl ? /* @__PURE__ */ jsx(RemoteFavicon, { url: docsUrl }) : null,
        docsUrl ? /* @__PURE__ */ jsx(
          "a",
          {
            href: docsUrl,
            target: "_blank",
            rel: "noreferrer",
            className: LinkStyle,
            children: pixel.type
          }
        ) : pixel.type
      ] }) });
    }
  },
  {
    key: "user_id",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Owner" }),
    width: "flex-2 min-w-140",
    body: (pixel) => {
      if (!pixel.user)
        return "";
      return /* @__PURE__ */ jsx(
        NameWithAvatar,
        {
          image: pixel.user.avatar,
          label: pixel.user.display_name,
          description: pixel.user.email
        }
      );
    }
  },
  {
    key: "pixel_id",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Pixel ID" }),
    body: (pixel) => pixel.pixel_id
  },
  {
    key: "updated_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (pixel) => pixel.updated_at ? /* @__PURE__ */ jsx(FormattedDate, { date: pixel.updated_at }) : ""
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-42 flex-shrink-0",
    body: (pixel) => {
      return /* @__PURE__ */ jsx(PermissionAwareButton, { resource: pixel, action: "update", children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(IconButton, { className: "text-muted", children: /* @__PURE__ */ jsx(EditIcon, {}) }),
        /* @__PURE__ */ jsx(UpdatePixelDialog, { pixel })
      ] }) });
    }
  }
];
const locationTracking = "/assets/location-tracking-0df79a5f.svg";
const TrackingPixelsDatatableFilters = [
  {
    key: "type",
    label: message("Type"),
    description: message("Type of the pixel"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      options: SupportedTrackingPixels.map((pixel, index) => {
        return { key: pixel.name, value: pixel.name, label: message(pixel.name) };
      })
    }
  },
  createdAtFilter({
    description: message("Date pixel was created")
  }),
  updatedAtFilter({
    description: message("Date pixel was last updated")
  }),
  {
    key: "user_id",
    label: message("Owner"),
    description: message("User pixel belongs to"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL
    }
  }
];
function useCreatePixel(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => createPixel(props),
    onSuccess: () => {
      toast.positive(trans(message("Pixel created")));
      queryClient.invalidateQueries({ queryKey: DatatableDataQueryKey("tp") });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createPixel(payload) {
  return apiClient.post("tp", payload).then((r) => r.data);
}
function CreatePixelDialog() {
  const form = useForm({
    defaultValues: { type: "facebook" }
  });
  const { formId, close } = useDialogContext();
  const createPixel2 = useCreatePixel(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Create pixel" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdatePixelForm,
      {
        formId,
        form,
        onSubmit: (values) => {
          createPixel2.mutate(values, {
            onSuccess: () => {
              close();
            }
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: createPixel2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Create" })
        }
      )
    ] })
  ] });
}
function TrackingPixelsDatablePage({
  forCurrentUser
}) {
  const { user } = useAuth();
  const { workspaceId } = useActiveWorkspaceId();
  const { filters, columns } = useMemo(() => {
    const columns2 = !forCurrentUser ? TrackingPixelsDatatableColumns : TrackingPixelsDatatableColumns.filter((col) => col.key !== "user_id");
    const filters2 = !forCurrentUser ? TrackingPixelsDatatableFilters : TrackingPixelsDatatableFilters.filter(
      (filter) => filter.key !== "user_id"
    );
    return { filters: filters2, columns: columns2 };
  }, [forCurrentUser]);
  const userId = forCurrentUser ? user == null ? void 0 : user.id : "";
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "tp",
      queryParams: { userId, with: "user", workspaceId },
      title: /* @__PURE__ */ jsx(Trans, { message: "Tracking pixels" }),
      filters,
      columns,
      headerContent: /* @__PURE__ */ jsx(InfoTrigger$3, {}),
      headerItemsAlign: "items-center",
      actions: /* @__PURE__ */ jsx(Actions$3, {}),
      selectedActions: /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "trackingPixel", action: "delete", children: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}) }),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: locationTracking,
          title: /* @__PURE__ */ jsx(Trans, { message: "No tracking pixels have been added yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching tracking pixels" })
        }
      )
    }
  );
}
function Actions$3() {
  return /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "trackingPixel", action: "create", children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Add pixel" }) }),
    /* @__PURE__ */ jsx(CreatePixelDialog, {})
  ] }) });
}
function InfoTrigger$3() {
  return /* @__PURE__ */ jsx(
    InfoDialogTrigger,
    {
      body: /* @__PURE__ */ jsx(Trans, { message: "Add third party tracking integration to your links using pixels or custom code snippet." })
    }
  );
}
function useUpdateLinkPageOptions(pageId, form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => updatePage$1(pageId, props),
    onSuccess: () => {
      toast.positive(trans(message("Page options updated")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("link-page")
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updatePage$1(pageId, payload) {
  return apiClient.put(`link-page/${pageId}`, { meta: payload }).then((r) => r.data);
}
function LinkPageOptionsTrigger({ page }) {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Page options" }), children: /* @__PURE__ */ jsx(IconButton, { className: "text-muted", children: /* @__PURE__ */ jsx(SettingsIcon, {}) }) }),
    /* @__PURE__ */ jsx(OptionsDialog, { page })
  ] });
}
function OptionsDialog({ page }) {
  var _a2, _b2;
  const { data } = useLinkSummary();
  const { hasPermission } = useAuth();
  const canChangeOptions = (data == null ? void 0 : data.usage.custom_pages.options) || hasPermission("admin");
  const { formId, close } = useDialogContext();
  const form = useForm({
    defaultValues: {
      hideFooter: Boolean((_a2 = page.meta) == null ? void 0 : _a2.hideFooter),
      hideNavbar: Boolean((_b2 = page.meta) == null ? void 0 : _b2.hideNavbar)
    }
  });
  const updateOptions = useUpdateLinkPageOptions(page.id, form);
  return /* @__PURE__ */ jsxs(Dialog, { size: "sm", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Link page options" }) }),
    /* @__PURE__ */ jsxs(DialogBody, { children: [
      !canChangeOptions && /* @__PURE__ */ jsx(
        NoPermissionButton,
        {
          className: "mb-24",
          message: /* @__PURE__ */ jsx(Trans, { message: "Your current plan does not include link page option editing." })
        }
      ),
      /* @__PURE__ */ jsxs(
        Form,
        {
          id: formId,
          form,
          onSubmit: (values) => {
            updateOptions.mutate(values, { onSuccess: close });
          },
          children: [
            /* @__PURE__ */ jsx(
              FormSwitch,
              {
                className: "mb-24",
                name: "hideNavbar",
                disabled: !canChangeOptions,
                description: /* @__PURE__ */ jsx(Trans, { message: "Whether navbar should be hidden on this link page." }),
                children: /* @__PURE__ */ jsx(Trans, { message: "Hide navbar" })
              }
            ),
            /* @__PURE__ */ jsx(
              FormSwitch,
              {
                name: "hideFooter",
                disabled: !canChangeOptions,
                description: /* @__PURE__ */ jsx(Trans, { message: "Whether footer should be hidden on this link page." }),
                children: /* @__PURE__ */ jsx(Trans, { message: "Hide footer" })
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "text", onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: updateOptions.isPending || !canChangeOptions,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const LinkPagesDatatableColumns = [
  {
    key: "title",
    allowsSorting: true,
    width: "flex-2 min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Title" }),
    body: (page) => /* @__PURE__ */ jsx(Link, { target: "_blank", to: `/pages/${page.slug}`, className: LinkStyle, children: page.title })
  },
  {
    key: "user_id",
    allowsSorting: true,
    width: "flex-2 min-w-140",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Owner" }),
    body: (page) => page.user && /* @__PURE__ */ jsx(
      NameWithAvatar,
      {
        image: page.user.avatar,
        label: page.user.display_name,
        description: page.user.email
      }
    )
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (page) => /* @__PURE__ */ jsx(FormattedDate, { date: page.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-84 flex-shrink-0",
    visibleInMode: "all",
    body: (page) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(LinkPageOptionsTrigger, { page }),
      /* @__PURE__ */ jsx(PermissionAwareButton, { resource: page, action: "update", children: /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Edit page" }), children: /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "md",
          className: "text-muted",
          elementType: Link,
          to: `${page.id}/edit`,
          children: /* @__PURE__ */ jsx(EditIcon, {})
        }
      ) }) })
    ] })
  }
];
function LinkPagesDatatablePage({
  forCurrentUser
}) {
  const config = useContext(SiteConfigContext);
  const { user } = useAuth();
  const { workspaceId } = useActiveWorkspaceId();
  const { filters, columns } = useMemo(() => {
    const columns2 = !forCurrentUser ? LinkPagesDatatableColumns : LinkPagesDatatableColumns.filter((col) => col.key !== "user_id");
    const filters2 = !forCurrentUser ? CustomPageDatatableFilters(config) : CustomPageDatatableFilters(config).filter(
      (filter) => filter.key !== "user_id"
    );
    return { filters: filters2, columns: columns2 };
  }, [forCurrentUser, config]);
  const userId = forCurrentUser ? user == null ? void 0 : user.id : "";
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "link-page",
      title: /* @__PURE__ */ jsx(Trans, { message: "Link pages" }),
      filters,
      columns,
      headerContent: /* @__PURE__ */ jsx(InfoTrigger$2, {}),
      headerItemsAlign: "items-center",
      queryParams: { userId, with: "user", workspaceId },
      actions: /* @__PURE__ */ jsx(Actions$2, {}),
      selectedActions: /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "customPage", action: "delete", children: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}) }),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: articlesSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No link pages have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching link pages" })
        }
      )
    }
  );
}
function Actions$2() {
  return /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "customPage", action: "create", children: /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "new", children: /* @__PURE__ */ jsx(Trans, { message: "New page" }) }) });
}
function InfoTrigger$2() {
  return /* @__PURE__ */ jsx(
    InfoDialogTrigger,
    {
      body: /* @__PURE__ */ jsx(Trans, { message: "Show a transitional page with fully custom markup. Users who visit the short url will briefly see the page before being redirected to destination url." })
    }
  );
}
const preferencesPopup = "/assets/preferences-popup-824a74c6.svg";
const LinkOverlaysDatatableColumns = [
  {
    key: "name",
    allowsSorting: true,
    width: "flex-1 min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    body: (overlay) => overlay.name
  },
  {
    key: "message",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Message" }),
    body: (overlay) => overlay.message
  },
  {
    key: "btn_text",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Button text" }),
    body: (overlay) => overlay.btn_text
  },
  {
    key: "color",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Color" }),
    body: (overlay) => /* @__PURE__ */ jsx(
      ColorIcon,
      {
        viewBox: "0 0 48 48",
        className: "icon-lg",
        style: { fill: overlay.colors["bg-color"] }
      }
    )
  },
  {
    key: "user_id",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Owner" }),
    width: "flex-2 min-w-140",
    body: (overlay) => {
      if (!overlay.user)
        return "";
      return /* @__PURE__ */ jsx(
        NameWithAvatar,
        {
          image: overlay.user.avatar,
          label: overlay.user.display_name,
          description: overlay.user.email
        }
      );
    }
  },
  {
    key: "updated_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (pixel) => pixel.updated_at ? /* @__PURE__ */ jsx(FormattedDate, { date: pixel.updated_at }) : ""
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-42 flex-shrink-0",
    body: (overlay) => {
      return /* @__PURE__ */ jsx(PermissionAwareButton, { resource: overlay, action: "update", children: /* @__PURE__ */ jsx(
        IconButton,
        {
          className: "text-muted",
          elementType: Link,
          to: `${overlay.id}/edit`,
          children: /* @__PURE__ */ jsx(EditIcon, {})
        }
      ) });
    }
  }
];
const LinkOverlayThemes = [
  { key: "default", label: message("Default") },
  { key: "full-width", label: message("Full width") },
  { key: "rounded", label: message("Rounded") },
  { key: "pill", label: message("Pill") }
];
const LinkOverlayPositions = [
  { key: "top-left", label: message("Top left") },
  { key: "top-right", label: message("Top right") },
  { key: "bottom-left", label: message("Bottom left") },
  { key: "bottom-right", label: message("Bottom right") }
];
const LinkOverlayColors = [
  { key: "bg-color", label: message("Background color") },
  { key: "text-color", label: message("Text color") },
  { key: "btn-bg-color", label: message("Button background") },
  { key: "btn-text-color", label: message("Button text") },
  { key: "label-bg-color", label: message("Label background") },
  { key: "label-color", label: message("Label text") }
];
const LinkOverlaysDatatableFilters = [
  {
    key: "theme",
    label: message("Theme"),
    description: message("Theme for the overlay"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "default",
      options: LinkOverlayThemes.map((theme) => ({
        key: theme.key,
        value: theme.key,
        label: theme.label
      }))
    }
  },
  {
    key: "position",
    label: message("Position"),
    description: message("Position for the overlay"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "bottom-left",
      options: LinkOverlayPositions.map((position2) => ({
        key: position2.key,
        value: position2.key,
        label: position2.label
      }))
    }
  },
  createdAtFilter({
    description: message("Date overlay was created")
  }),
  updatedAtFilter({
    description: message("Date overlay was last updated")
  }),
  {
    key: "user_id",
    label: message("Owner"),
    description: message("User overlay belongs to"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL
    }
  }
];
function LinkOverlaysDatatablePage({
  forCurrentUser
}) {
  const { user } = useAuth();
  const { workspaceId } = useActiveWorkspaceId();
  const { filters, columns } = useMemo(() => {
    const columns2 = !forCurrentUser ? LinkOverlaysDatatableColumns : LinkOverlaysDatatableColumns.filter((col) => col.key !== "user_id");
    const filters2 = !forCurrentUser ? LinkOverlaysDatatableFilters : LinkOverlaysDatatableFilters.filter((filter) => filter.key !== "user_id");
    return { filters: filters2, columns: columns2 };
  }, [forCurrentUser]);
  const userId = forCurrentUser ? user == null ? void 0 : user.id : "";
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "link-overlay",
      queryParams: { userId, with: "user", workspaceId },
      title: /* @__PURE__ */ jsx(Trans, { message: "Call-to-action overlays" }),
      headerContent: /* @__PURE__ */ jsx(InfoTrigger$1, {}),
      headerItemsAlign: "items-center",
      filters,
      columns,
      actions: /* @__PURE__ */ jsx(Actions$1, {}),
      selectedActions: /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "linkOverlay", action: "delete", children: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}) }),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: preferencesPopup,
          title: /* @__PURE__ */ jsx(Trans, { message: "No overlays have been added yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching overlays" })
        }
      )
    }
  );
}
function InfoTrigger$1() {
  return /* @__PURE__ */ jsx(
    InfoDialogTrigger,
    {
      body: /* @__PURE__ */ jsx(Trans, { message: "Display fully customizable, non-intrusive overlay with a message and call-to-action button over destination website." })
    }
  );
}
function Actions$1() {
  return /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "linkOverlay", action: "create", children: /* @__PURE__ */ jsx(DataTableAddItemButton, { to: "new", elementType: Link, children: /* @__PURE__ */ jsx(Trans, { message: "Add overlay" }) }) });
}
function useCreateLinkOverlay(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => createOverlay$1(payload),
    onSuccess: () => {
      toast.positive(trans(message("Overlay created")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("link-overlay")
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createOverlay$1(payload) {
  return apiClient.post("link-overlay", payload).then((r) => r.data);
}
function OverlayWebsiteBackground() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-card h-full overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "navbar flex items-center bg-alt h-40 w-full", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "os-button w-20 h-20 rounded-full ml-14",
          style: { background: "#d7665d" }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "os-button w-20 h-20 rounded-full ml-14",
          style: { background: "#deab54" }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "os-button w-20 h-20 rounded-full ml-14",
          style: { background: "#6fb54c" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "page-body p-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "top-row flex items-center h-60 bg-alt p-10 mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "circle w-40 h-40 rounded-full mr-auto bg-disabled-bg" }),
        /* @__PURE__ */ jsx("div", { className: "line w-1/6 h-20 rounded bg-disabled-bg ml-14" }),
        /* @__PURE__ */ jsx("div", { className: "line w-1/6 h-20 rounded bg-disabled-bg ml-14" }),
        /* @__PURE__ */ jsx("div", { className: "line w-1/6 h-20 rounded bg-disabled-bg ml-14" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "middle-row flex items-center justify-center flex-col h-[260px] bg-alt my-24", children: [
        /* @__PURE__ */ jsx("div", { className: "line rounded h-36 mb-20 w-3/5 bg-disabled-bg" }),
        /* @__PURE__ */ jsx("div", { className: "line rounded h-14 mb-4 w-1/2 bg-disabled-bg/5" }),
        /* @__PURE__ */ jsx("div", { className: "line rounded h-14 mb-4 w-1/2 bg-disabled-bg/5" }),
        /* @__PURE__ */ jsx("div", { className: "line rounded h-14 mb-4 w-1/2 bg-disabled-bg/5" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-container flex", children: [
        /* @__PURE__ */ jsxs("div", { className: "left w-1/3", children: [
          /* @__PURE__ */ jsx("div", { className: "rect h-144 bg-disabled-bg/5 mb-6" }),
          /* @__PURE__ */ jsx("div", { className: "line fat-line h-36 mb-10 rounded bg-disabled-bg/5" }),
          /* @__PURE__ */ jsx("div", { className: "line mb-10 h-20 rounded bg-disabled-bg" }),
          /* @__PURE__ */ jsx("div", { className: "line mb-10 h-20 rounded bg-disabled-bg" }),
          /* @__PURE__ */ jsx("div", { className: "separator h-1 bg-divider my-24" }),
          /* @__PURE__ */ jsx("div", { className: "rect h-144 bg-disabled-bg/5 mb-10" }),
          /* @__PURE__ */ jsx("div", { className: "line mb-10 h-20 rounded bg-disabled-bg" }),
          /* @__PURE__ */ jsx("div", { className: "rect h-144 bg-disabled-bg/5 mb-6" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "right w-2/3 pl-24", children: [
          /* @__PURE__ */ jsx("div", { className: "rect h-288 mb-32 bg-disabled-bg/5" }),
          /* @__PURE__ */ jsx("div", { className: "line mb-10 h-20 rounded bg-disabled-bg" }),
          /* @__PURE__ */ jsx("div", { className: "line fat-line h-36 mb-10 rounded bg-disabled-bg/5" }),
          /* @__PURE__ */ jsx("div", { className: "line mb-10 h-20 rounded bg-disabled-bg" }),
          /* @__PURE__ */ jsx("div", { className: "separator h-1 bg-divider my-24" }),
          /* @__PURE__ */ jsx("div", { className: "line mb-10 h-20 rounded bg-disabled-bg" }),
          /* @__PURE__ */ jsx("div", { className: "rect h-288 mb-32 bg-disabled-bg/5" })
        ] })
      ] })
    ] })
  ] });
}
function CrupdateLinkOverlayForm({
  form,
  isLoading,
  onSubmit
}) {
  return /* @__PURE__ */ jsxs(Form, { form, onSubmit, className: "flex h-full", children: [
    /* @__PURE__ */ jsx("div", { className: "h-full w-full flex-shrink-0 overflow-y-auto px-16 md:w-288 md:border-r md:shadow-lg", children: /* @__PURE__ */ jsxs(Tabs, { children: [
      /* @__PURE__ */ jsxs(TabList, { expand: true, children: [
        /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "General" }) }),
        /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Style" }) })
      ] }),
      /* @__PURE__ */ jsxs(TabPanels, { className: "my-24", children: [
        /* @__PURE__ */ jsxs(TabPanel, { children: [
          /* @__PURE__ */ jsx(GeneralFields, {}),
          /* @__PURE__ */ jsx(SaveButton$1, { disabled: isLoading })
        ] }),
        /* @__PURE__ */ jsxs(TabPanel, { children: [
          /* @__PURE__ */ jsx(StyleFields, {}),
          /* @__PURE__ */ jsx(SaveButton$1, { disabled: isLoading, className: "mt-14" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative hidden flex-auto md:block", children: [
      /* @__PURE__ */ jsx(OverlayWebsiteBackground, {}),
      /* @__PURE__ */ jsx(OverlayPreview, {})
    ] })
  ] });
}
function SaveButton$1(props) {
  return /* @__PURE__ */ jsx(Button, { type: "submit", variant: "flat", color: "primary", ...props, children: /* @__PURE__ */ jsx(Trans, { message: "Save" }) });
}
function BackgroundField() {
  return /* @__PURE__ */ jsx(
    FormImageSelector,
    {
      className: "mb-20",
      name: "colors.bg-image",
      label: /* @__PURE__ */ jsx(Trans, { message: "Background image" }),
      diskPrefix: "overlays",
      showRemoveButton: true
    }
  );
}
function ColorField({ name, children }) {
  const { watch, setValue } = useFormContext();
  const color = watch(`colors.${name}`);
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      value: color,
      type: "popover",
      placement: "right",
      offset: 10,
      onClose: (newColor) => setValue(`colors.${name}`, newColor),
      onValueChange: (newColor) => setValue(`colors.${name}`, newColor),
      children: [
        /* @__PURE__ */ jsxs(ButtonBase, { className: "relative mb-10 flex h-54 w-full items-center gap-10 rounded border bg px-14 text-sm hover:bg-hover", children: [
          /* @__PURE__ */ jsx(
            ColorIcon,
            {
              viewBox: "0 0 48 48",
              className: "icon-lg",
              style: { fill: color }
            }
          ),
          /* @__PURE__ */ jsx("div", { children }),
          /* @__PURE__ */ jsx(KeyboardArrowRightIcon, { className: "ml-auto text-muted icon-sm" })
        ] }),
        /* @__PURE__ */ jsx(ColorPickerDialog, {})
      ]
    }
  );
}
function StyleFields() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(BackgroundField, {}) }),
    LinkOverlayColors.map(({ key, label }) => /* @__PURE__ */ jsx(ColorField, { name: key, children: /* @__PURE__ */ jsx(Trans, { ...label }) }, key))
  ] });
}
function GeneralFields() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        className: "mb-24",
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        name: "position",
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Position" }),
        className: "mb-24",
        children: LinkOverlayPositions.map((position2) => /* @__PURE__ */ jsx(Item, { value: position2.key, children: /* @__PURE__ */ jsx(Trans, { ...position2.label }) }, position2.key))
      }
    ),
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        name: "theme",
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Theme" }),
        className: "mb-24",
        children: LinkOverlayThemes.map((theme) => /* @__PURE__ */ jsx(Item, { value: theme.key, children: /* @__PURE__ */ jsx(Trans, { ...theme.label }) }, theme.key))
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "message",
        label: /* @__PURE__ */ jsx(Trans, { message: "Message" }),
        inputElementType: "textarea",
        maxLength: 200,
        rows: 2,
        className: "mb-24"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "label",
        label: /* @__PURE__ */ jsx(Trans, { message: "Label" }),
        maxLength: 8,
        className: "mb-24"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        type: "url",
        name: "btn_link",
        label: /* @__PURE__ */ jsx(Trans, { message: "Button link" }),
        className: "mb-24"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "btn_text",
        label: /* @__PURE__ */ jsx(Trans, { message: "Button text" }),
        maxLength: 30,
        className: "mb-24"
      }
    )
  ] });
}
function OverlayPreview() {
  const { watch } = useFormContext();
  const values = watch();
  return /* @__PURE__ */ jsx(FloatingLinkOverlay, { overlay: values });
}
function CreateLinkOverlayPage() {
  const { trans } = useTrans();
  const navigate = useNavigate$1();
  const form = useForm({
    defaultValues: {
      position: "bottom-left",
      theme: "default",
      label: trans(message("Label")),
      message: trans(message("Your message here")),
      btn_text: trans(message("Button text")),
      btn_link: "https://google.com",
      colors: {
        "bg-color": "rgb(61, 75, 101)",
        "text-color": "rgb(255, 255, 255)",
        "label-bg-color": "rgb(255, 255, 255)",
        "label-color": "rgb(0, 0, 0)"
      }
    }
  });
  const createOverlay2 = useCreateLinkOverlay(form);
  return /* @__PURE__ */ jsx(
    CrupdateLinkOverlayForm,
    {
      form,
      isLoading: createOverlay2.isPending,
      onSubmit: (values) => {
        createOverlay2.mutate(values, {
          onSuccess: () => navigate("..", { relative: "path" })
        });
      }
    }
  );
}
const linkOverlayEndpoint = (overlayId) => `link-overlay/${overlayId}`;
function useLinkOverlay(overlayId) {
  return useQuery({
    queryKey: [linkOverlayEndpoint(overlayId)],
    queryFn: () => getLinkOverlay(overlayId)
  });
}
function getLinkOverlay(overlayId) {
  return apiClient.get(linkOverlayEndpoint(overlayId)).then((response) => response.data);
}
function useUpdateLinkOverlay(overlayId, form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => createOverlay(overlayId, payload),
    onSuccess: () => {
      toast.positive(trans(message("Overlay updated")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("link-overlay")
      });
      queryClient.invalidateQueries({
        queryKey: [linkOverlayEndpoint(overlayId)]
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createOverlay(overlayId, payload) {
  return apiClient.put(`link-overlay/${overlayId}`, payload).then((r) => r.data);
}
function UpdateLinkOverlayPage() {
  const { overlayId } = useParams();
  const { data, isLoading, isError } = useLinkOverlay(overlayId);
  if (data) {
    return /* @__PURE__ */ jsx(PageContent$1, { overlay: data.linkOverlay });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, {});
  }
  if (isError) {
    return null;
  }
}
function PageContent$1({ overlay }) {
  const navigate = useNavigate$1();
  const form = useForm({
    defaultValues: {
      name: overlay.name,
      position: overlay.position,
      theme: overlay.theme,
      label: overlay.label,
      message: overlay.message,
      btn_text: overlay.btn_text,
      btn_link: overlay.btn_link,
      colors: overlay.colors
    }
  });
  const updateOverlay = useUpdateLinkOverlay(overlay.id, form);
  return /* @__PURE__ */ jsx(
    CrupdateLinkOverlayForm,
    {
      form,
      isLoading: updateOverlay.isPending,
      onSubmit: (values) => {
        updateOverlay.mutate(values, {
          onSuccess: () => navigate("../..", { relative: "path" })
        });
      }
    }
  );
}
const marketing = "/assets/marketing-2040a197.svg";
const BiolinksDatatableColumns = [
  {
    key: "name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    body: (biolink) => /* @__PURE__ */ jsx(
      "a",
      {
        className: LinkStyle,
        href: biolink.short_url,
        target: "_blank",
        rel: "noreferrer",
        children: biolink.name
      }
    )
  },
  {
    key: "clicks_count",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Clicks" }),
    body: (biolink) => biolink.clicks_count ? /* @__PURE__ */ jsx(FormattedNumber, { value: biolink.clicks_count }) : "-"
  },
  {
    key: "domain_id",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Domain" }),
    body: (biolink) => /* @__PURE__ */ jsx(DomainColumn, { model: biolink })
  },
  {
    key: "user_id",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Owner" }),
    width: "flex-2 min-w-140",
    body: (biolink) => {
      if (!biolink.user)
        return "";
      return /* @__PURE__ */ jsx(
        NameWithAvatar,
        {
          image: biolink.user.avatar,
          label: biolink.user.display_name,
          description: biolink.user.email
        }
      );
    }
  },
  {
    key: "links_count",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Links" }),
    body: (biolink) => biolink.links_count ? /* @__PURE__ */ jsx(FormattedNumber, { value: biolink.links_count }) : "-"
  },
  {
    key: "active",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Active" }),
    body: (biolink) => biolink.active ? /* @__PURE__ */ jsx(CheckIcon, { className: "icon-md text-positive" }) : /* @__PURE__ */ jsx(CloseIcon, { className: "icon-md text-danger" })
  },
  {
    key: "updated_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (link) => link.updated_at ? /* @__PURE__ */ jsx(FormattedDate, { date: link.updated_at }) : ""
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-128 flex-shrink-0",
    visibleInMode: "all",
    body: (biolink) => /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
      /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Clicks report" }), children: /* @__PURE__ */ jsx(Link, { to: `${biolink.id}`, children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(BarChartIcon, {}) }) }) }),
      /* @__PURE__ */ jsx(ShareLinkButton, { link: biolink }),
      /* @__PURE__ */ jsx(PermissionAwareButton, { resource: biolink, action: "update", children: /* @__PURE__ */ jsx(Link, { to: `${biolink.id}/edit/content`, children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(EditIcon, {}) }) }) })
    ] })
  }
];
function DomainColumn({ model }) {
  const { data } = useLinkFormValueLists();
  const defaultHost = useDefaultCustomDomainHost(data == null ? void 0 : data.domains);
  if (model.domain_id === 0 && defaultHost) {
    return /* @__PURE__ */ jsx(Fragment, { children: defaultHost });
  }
  if (model.domain_id && model.domain) {
    return /* @__PURE__ */ jsx(Fragment, { children: removeProtocol(model.domain.host) });
  }
  return /* @__PURE__ */ jsx(Trans, { message: "All domains" });
}
const BiolinksDatatableFilters = [
  {
    key: "active",
    label: message("Status"),
    description: message("Whether biolink is disabled or not"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("Enabled"),
          value: true
        },
        {
          key: "02",
          label: message("Disabled"),
          value: false
        }
      ]
    }
  },
  {
    key: "clicks_count",
    label: message("Clicks count"),
    description: message("Number of times this biolink was visited"),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: "number",
      defaultValue: 1
    }
  },
  {
    key: "links_count",
    label: message("Link count"),
    description: message("Number of links in the biolink"),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: "number",
      defaultValue: 1
    }
  },
  createdAtFilter({
    description: message("Date biolink was created")
  }),
  updatedAtFilter({
    description: message("Date biolink was last updated")
  }),
  {
    key: "user_id",
    label: message("Owner"),
    description: message("User biolink was created by"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL
    }
  }
];
function useCreateBiolink(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => createLinkGroup(props),
    onSuccess: () => {
      toast.positive(trans(message("Biolink created")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("biolink")
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createLinkGroup(payload) {
  return apiClient.post("biolink", buildLinkeablePayload(payload)).then((r) => r.data);
}
function CreateBiolinkDialog() {
  const navigate = useNavigate$1();
  const { formId, close } = useDialogContext();
  const { custom_domains } = useSettings();
  const { verify, isVerifying } = useRecaptcha("link_creation");
  const form = useForm({
    defaultValues: {
      active: true,
      hash: nanoid(6),
      domain_id: (custom_domains == null ? void 0 : custom_domains.allow_all_option) ? void 0 : 0
    }
  });
  const createBiolink = useCreateBiolink(form);
  const handleSubmit = async (values) => {
    const isValid = await verify();
    if (isValid) {
      createBiolink.mutate(values, {
        onSuccess: (response) => {
          close();
          navigate(`${response.biolink.id}/edit`);
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs(Dialog, { size: "md", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Create biolink" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        id: formId,
        onBeforeSubmit: () => {
          form.clearErrors("hash");
        },
        onSubmit: handleSubmit,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-24", children: [
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                name: "name",
                label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
                minLength: 3,
                className: "mb-8",
                autoFocus: true
              }
            ),
            /* @__PURE__ */ jsx(AliasField, { form, name: "hash" })
          ] }),
          /* @__PURE__ */ jsx(LinkDomainSelect, { name: "domain_id", className: "mb-24" }),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "description",
              className: "mb-24",
              label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
              inputElementType: "textarea",
              rows: 2
            }
          ),
          /* @__PURE__ */ jsx(
            FormSwitch,
            {
              name: "active",
              description: /* @__PURE__ */ jsx(Trans, { message: "Whether this biolink is viewable publicly." }),
              className: "mb-24",
              children: /* @__PURE__ */ jsx(Trans, { message: "Active" })
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: createBiolink.isPending || isVerifying,
          children: /* @__PURE__ */ jsx(Trans, { message: "Create" })
        }
      )
    ] })
  ] });
}
function BioLinksDatatablePage({
  forCurrentUser
}) {
  const { user } = useAuth();
  const { workspaceId } = useActiveWorkspaceId();
  const { filters, columns } = useMemo(() => {
    const columns2 = !forCurrentUser ? BiolinksDatatableColumns : BiolinksDatatableColumns.filter((col) => col.key !== "user_id");
    const filters2 = !forCurrentUser ? BiolinksDatatableFilters : BiolinksDatatableFilters.filter((filter) => filter.key !== "user_id");
    return { filters: filters2, columns: columns2 };
  }, [forCurrentUser]);
  useEffect(() => {
    prefetchLinkFormValueLists();
  }, []);
  const userId = forCurrentUser ? user == null ? void 0 : user.id : "";
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "biolink",
      queryParams: {
        userId,
        withCount: "links",
        with: "user,domain",
        workspaceId
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Biolinks" }),
      headerItemsAlign: "items-center",
      headerContent: /* @__PURE__ */ jsx(InfoTrigger, {}),
      filters,
      columns,
      actions: /* @__PURE__ */ jsx(Actions, {}),
      selectedActions: /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "biolink", action: "delete", children: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}) }),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: marketing,
          title: /* @__PURE__ */ jsx(Trans, { message: "No biolinks have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching biolinks" })
        }
      )
    }
  );
}
function InfoTrigger() {
  return /* @__PURE__ */ jsx(
    InfoDialogTrigger,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Link in bio" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Offer multiple choices to your followers when they click on your Biolink. Share all your Social Media profiles, videos, songs, articles and other important links with just one url." })
    }
  );
}
function Actions() {
  return /* @__PURE__ */ jsx(PermissionAwareButton, { resource: "biolink", action: "create", children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "New biolink" }) }),
    /* @__PURE__ */ jsx(CreateBiolinkDialog, {})
  ] }) });
}
const biolinkQueryKey = (biolinkId, params2) => {
  return DatatableDataQueryKey(
    `biolink/${biolinkId}`,
    params2
  );
};
function useBiolink() {
  const { biolinkId } = useParams();
  return useQuery({
    queryKey: biolinkQueryKey(biolinkId),
    queryFn: () => fetchBiolink(biolinkId),
    initialData: seedInitialDataFromPaginatedList(biolinkId)
  });
}
async function fetchBiolink(biolinkId, params2, onLoad) {
  const response = await apiClient.get(`biolink/${biolinkId}`, { params: params2 }).then((response2) => response2.data);
  onLoad == null ? void 0 : onLoad(response);
  return response;
}
function seedInitialDataFromPaginatedList(biolinkId) {
  var _a2, _b2;
  const biolink = (_b2 = (_a2 = queryClient.getQueryData(
    DatatableDataQueryKey("biolink")
  )) == null ? void 0 : _a2.pagination) == null ? void 0 : _b2.data.find((link) => link.id === +biolinkId);
  return biolink ? { biolink } : void 0;
}
function BiolinkClicksReportPage() {
  var _a2;
  const navigate = useNavigate$1();
  const { biolinkId } = useParams();
  const query = useBiolink();
  const biolink = (_a2 = query.data) == null ? void 0 : _a2.biolink;
  return /* @__PURE__ */ jsx(
    ClicksReportPageLayout,
    {
      model: `biolink=${biolinkId}`,
      title: /* @__PURE__ */ jsxs(Breadcrumb, { size: "xl", className: clsx(query.isLoading && "invisible"), children: [
        /* @__PURE__ */ jsx(
          BreadcrumbItem,
          {
            onSelected: () => {
              navigate("..", { relative: "path" });
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Biolinks" })
          }
        ),
        /* @__PURE__ */ jsx(BreadcrumbItem, { className: "first-letter:capitalize", children: /* @__PURE__ */ jsx(Trans, { message: "“:name“ clicks", values: { name: biolink == null ? void 0 : biolink.name } }) })
      ] }),
      actions: biolink && /* @__PURE__ */ jsx(
        ShareLinkButton,
        {
          className: "flex-shrink-0 text-muted",
          link: biolink
        }
      )
    }
  );
}
const WidgetsIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m16.66 4.52 2.83 2.83-2.83 2.83-2.83-2.83 2.83-2.83M9 5v4H5V5h4m10 10v4h-4v-4h4M9 15v4H5v-4h4m7.66-13.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65zM11 3H3v8h8V3zm10 10h-8v8h8v-8zm-10 0H3v8h8v-8z" }),
  "WidgetsOutlined"
);
const AnimationIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15 2c-2.71 0-5.05 1.54-6.22 3.78-1.28.67-2.34 1.72-3 3C3.54 9.95 2 12.29 2 15c0 3.87 3.13 7 7 7 2.71 0 5.05-1.54 6.22-3.78 1.28-.67 2.34-1.72 3-3C20.46 14.05 22 11.71 22 9c0-3.87-3.13-7-7-7zM9 20c-2.76 0-5-2.24-5-5 0-1.12.37-2.16 1-3 0 3.87 3.13 7 7 7-.84.63-1.88 1-3 1zm3-3c-2.76 0-5-2.24-5-5 0-1.12.37-2.16 1-3 0 3.86 3.13 6.99 7 7-.84.63-1.88 1-3 1zm4.7-3.3c-.53.19-1.1.3-1.7.3-2.76 0-5-2.24-5-5 0-.6.11-1.17.3-1.7.53-.19 1.1-.3 1.7-.3 2.76 0 5 2.24 5 5 0 .6-.11 1.17-.3 1.7zM19 12c0-3.86-3.13-6.99-7-7 .84-.63 1.87-1 3-1 2.76 0 5 2.24 5 5 0 1.12-.37 2.16-1 3z" }),
  "AnimationOutlined"
);
const ShortcutIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m15 5-1.41 1.41L15 7.83 17.17 10H8c-2.76 0-5 2.24-5 5v4h2v-4c0-1.65 1.35-3 3-3h9.17L15 14.17l-1.41 1.41L15 17l6-6-6-6z" }),
  "ShortcutOutlined"
);
const MoreTimeIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M10 8v6l4.7 2.9.8-1.2-4-2.4V8z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M17.92 12c.05.33.08.66.08 1 0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7c.7 0 1.37.1 2 .29V4.23c-.64-.15-1.31-.23-2-.23-5 0-9 4-9 9s4 9 9 9 9-4 9-9c0-.34-.02-.67-.06-1h-2.02z" }, "1"), /* @__PURE__ */ jsx("path", { d: "M20 5V2h-2v3h-3v2h3v3h2V7h3V5z" }, "2")],
  "MoreTimeOutlined"
);
const BaseColorBg = {
  type: "color",
  id: "c-custom",
  label: message("Custom color")
};
const ColorBackgrounds = ColorPresets.map(
  (preset, index) => {
    return {
      ...BaseColorBg,
      id: `c${index}`,
      backgroundColor: preset.color,
      label: preset.name,
      color: preset.foreground
    };
  }
);
const defaultAppearance = {
  bgConfig: {
    ...BaseColorBg,
    backgroundColor: "",
    color: ""
  }
};
const useBiolinkEditorStore = create()(
  immer((set, get) => ({
    appearance: defaultAppearance,
    appearanceIsDirty: false,
    setAppearanceIsDirty: (isDirty) => {
      set((state) => {
        state.appearanceIsDirty = isDirty;
      });
    },
    biolink: null,
    setBiolink: (biolink) => {
      set((state) => {
        var _a2;
        state.biolink = biolink;
        if (!state.appearanceIsDirty) {
          state.appearance = ((_a2 = biolink.appearance) == null ? void 0 : _a2.config) || defaultAppearance;
        }
      });
    },
    updateAppearance(payload) {
      set((state) => {
        state.appearanceIsDirty = true;
        state.appearance = {
          ...state.appearance,
          ...payload
        };
      });
    }
  }))
);
function biolinkEditorState() {
  return useBiolinkEditorStore.getState();
}
const params = {
  loadContent: true
};
function useEditorBiolink() {
  const biolinkId = useEditorBiolinkId();
  const biolink = useBiolinkEditorStore((s) => s.biolink);
  const query = useQuery({
    queryKey: biolinkQueryKey(biolinkId, params),
    queryFn: () => fetchBiolink(biolinkId, params, (data) => {
      biolinkEditorState().setBiolink(data.biolink);
    })
  });
  return { isLoading: query.isLoading, biolink, status: query.status, biolinkId };
}
function useEditorBiolinkId() {
  const { biolinkId } = useParams();
  return +biolinkId;
}
function setEditorBiolink(biolink) {
  biolinkEditorState().setBiolink(biolink);
  queryClient.setQueryData(
    biolinkQueryKey(biolink.id, params),
    { biolink }
  );
}
function useUpdateBiolinkContentItem() {
  const biolinkId = useEditorBiolinkId();
  return useMutation({
    mutationFn: ({ item, values }) => updateItem(biolinkId, item, values),
    onSuccess: (response) => {
      setEditorBiolink(response.biolink);
    },
    onError: (err) => showHttpErrorToast(err, message("Could not update content item"))
  });
}
function updateItem(biolinkId, item, editorPayload) {
  const backendPayload = {
    ...editorPayload,
    item_id: item.id,
    item_model_type: item.model_type
  };
  return apiClient.put(`biolink/${biolinkId}/content-item`, backendPayload).then((r) => r.data);
}
function LinkScheduleDialog({ link }) {
  const now2 = useCurrentDateTime();
  const timezone = useUserTimezone();
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      activates_at: link.activates_at,
      expires_at: link.expires_at
    }
  });
  const updateItem2 = useUpdateBiolinkContentItem();
  const activationDate = form.watch("activates_at");
  const expirationMinDate = useMemo(() => {
    if (activationDate) {
      return parseAbsolute(activationDate, timezone);
    }
    return now2;
  }, [activationDate, now2, timezone]);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Schedule" }) }),
    /* @__PURE__ */ jsxs(DialogBody, { children: [
      /* @__PURE__ */ jsxs(
        Form,
        {
          id: formId,
          form,
          onSubmit: async (values) => {
            updateItem2.mutate(
              {
                item: link,
                values
              },
              {
                onSuccess: () => {
                  toast.positive(message("Schedule updated"));
                  close();
                }
              }
            );
          },
          children: [
            /* @__PURE__ */ jsx(
              FormDatePicker,
              {
                name: "activates_at",
                min: now2,
                className: "mb-24",
                label: /* @__PURE__ */ jsx(Trans, { message: "Start date" }),
                showCalendarFooter: true
              }
            ),
            /* @__PURE__ */ jsx(
              FormDatePicker,
              {
                name: "expires_at",
                min: expirationMinDate,
                className: "mb-24",
                label: /* @__PURE__ */ jsx(Trans, { message: "End date" }),
                showCalendarFooter: true
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(InfoSection$1, {})
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { dividerTop: true, children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: updateItem2.isPending || !form.formState.isDirty,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
function InfoSection$1() {
  const values = {
    b: (parts) => /* @__PURE__ */ jsx("span", { className: "font-bold", children: parts })
  };
  return /* @__PURE__ */ jsx(
    SectionHelper,
    {
      description: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Leave <b>start date</b> blank to display this link immediately.",
            values
          }
        ) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Leave <b>end date</b> blank to display this link forever.",
            values
          }
        ) })
      ] })
    }
  );
}
function LeapLinkDialog({ link }) {
  const now2 = useCurrentDateTime();
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      leap_until: link.leap_until
    }
  });
  const isDirty = form.formState.isDirty;
  const updateItem2 = useUpdateBiolinkContentItem();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Redirect link" }) }),
    /* @__PURE__ */ jsxs(DialogBody, { children: [
      /* @__PURE__ */ jsx(
        Form,
        {
          id: formId,
          form,
          onSubmit: async (values) => {
            updateItem2.mutate(
              {
                item: link,
                values
              },
              {
                onSuccess: () => {
                  toast.positive(message("Redirect link updated"));
                  close();
                }
              }
            );
          },
          children: /* @__PURE__ */ jsx(
            FormDatePicker,
            {
              required: true,
              name: "leap_until",
              min: now2,
              className: "mb-24",
              label: /* @__PURE__ */ jsx(Trans, { message: "Redirect until" }),
              showCalendarFooter: true
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(InfoSection, {})
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { dividerTop: true, children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: !isDirty || updateItem2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
function InfoSection() {
  return /* @__PURE__ */ jsx(
    SectionHelper,
    {
      description: /* @__PURE__ */ jsx(Trans, { message: "Send all visitors straight to this link, instead of your Biolink, until the specified date. After that date, Biolink will resume to showing normally." })
    }
  );
}
function LinkThumbnailDialog({ link }) {
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      image: link.image
    }
  });
  const updateItem2 = useUpdateBiolinkContentItem();
  const isDirty = form.formState.isDirty;
  return /* @__PURE__ */ jsxs(Dialog, { size: "sm", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Link thumbnail" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        id: formId,
        form,
        onSubmit: async (values) => {
          updateItem2.mutate(
            {
              item: link,
              values
            },
            {
              onSuccess: () => {
                toast.positive(message("Thumbnail updated"));
                close();
              }
            }
          );
        },
        children: /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
          FormImageSelector,
          {
            showRemoveButton: true,
            name: "image",
            diskPrefix: "links"
          }
        ) })
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { dividerTop: true, children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: updateItem2.isPending || !isDirty,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const LinkAnimationList = [
  "none",
  "bounce",
  "flash",
  "pulse",
  "rubberBand",
  "shakeX",
  "shakeY",
  "headShake",
  "swing",
  "tada",
  "wobble",
  "jello",
  "heartBeat"
];
function LinkAnimationDialog({ link }) {
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      animation: link.animation
    }
  });
  const isDirty = form.formState.isDirty;
  const updateItem2 = useUpdateBiolinkContentItem();
  useEffect(() => {
    import("./animate.min-ed24eced.mjs");
  }, []);
  return /* @__PURE__ */ jsxs(Dialog, { size: "md", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Link animation" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form,
      {
        id: formId,
        form,
        onSubmit: async (values) => {
          updateItem2.mutate(
            {
              item: link,
              values
            },
            {
              onSuccess: () => {
                toast.positive(message("Animation updated"));
                close();
              }
            }
          );
        },
        children: [
          /* @__PURE__ */ jsx(
            SectionHelper,
            {
              className: "mb-24",
              description: /* @__PURE__ */ jsx(
                Trans,
                {
                  message: "Add animation to draw attention to this link. :br Selected animation will repeat three times by default.",
                  values: { br: /* @__PURE__ */ jsx("br", {}) }
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(95px,1fr))] gap-14", children: LinkAnimationList.map((animation, index) => /* @__PURE__ */ jsx(AnimationItem, { animationName: animation }, index)) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { dividerTop: true, children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: updateItem2.isPending || !isDirty,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
function AnimationItem({ animationName }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { watch, setValue } = useFormContext();
  const animation = animationName === "none" ? null : animationName;
  const selectedAnimation = watch("animation");
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: () => {
        setValue("animation", animation, { shouldDirty: true });
      },
      onPointerEnter: () => {
        setIsAnimating(true);
      },
      onPointerLeave: () => {
        setIsAnimating(false);
      },
      className: clsx(
        "animate__animated flex h-64 items-center justify-center rounded border border-2 px-10 font-medium uppercase",
        isAnimating && `animate__${animationName}`,
        selectedAnimation === animation && "border-primary"
      ),
      children: animationName
    }
  );
}
function useDetachBiolinkContentItem() {
  const biolinkId = useEditorBiolinkId();
  return useMutation({
    mutationFn: (payload) => detachItem(biolinkId, payload),
    onSuccess: (response) => {
      setEditorBiolink(response.biolink);
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function detachItem(biolinkId, payload) {
  return apiClient.post(`biolink/${biolinkId}/content-item/detach`, payload).then((r) => r.data);
}
function DetachContentItemButton({ item }) {
  const detachItem2 = useDetachBiolinkContentItem();
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        className: "text-muted flex-shrink-0",
        disabled: detachItem2.isPending,
        children: /* @__PURE__ */ jsx(CloseIcon, {})
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmationDialog,
      {
        isDanger: true,
        onConfirm: () => {
          detachItem2.mutate({ item });
        },
        title: /* @__PURE__ */ jsx(Trans, { message: "Remove item" }),
        body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to remove this item from the biolink?" }),
        confirm: /* @__PURE__ */ jsx(Trans, { message: "Remove" })
      }
    )
  ] });
}
function useSortBiolinkContent() {
  const biolinkId = useEditorBiolinkId();
  return useMutation({
    mutationFn: (payload) => sortContent(biolinkId, payload)
  });
}
function sortContent(biolinkId, { oldIndex, newIndex, widgetToPin }) {
  const biolink = biolinkEditorState().biolink;
  const content = moveItemInNewArray(biolink.content, oldIndex, newIndex);
  if (widgetToPin) {
    content[newIndex] = { ...content[newIndex], pinned: "top" };
  }
  biolinkEditorState().setBiolink({ ...biolink, content });
  const order = content.map((item) => ({
    id: item.id,
    model_type: item.model_type
  }));
  return apiClient.post(`biolink/${biolinkId}/change-order`, {
    order,
    widgetToPin
  });
}
function BiolinkContentItemLayout({
  item,
  biolink,
  title,
  updateDialog,
  children,
  actionRow
}) {
  const sortContent2 = useSortBiolinkContent();
  const itemRef = useRef(null);
  const sortDisabled = !item || item.pinned != null;
  const { sortableProps, dragHandleRef } = useSortable({
    item: item || "noop",
    items: (biolink == null ? void 0 : biolink.content) || [],
    type: "biolinkEditorSortable",
    ref: itemRef,
    onSortEnd: (oldIndex, newIndex) => {
      sortContent2.mutate({ oldIndex, newIndex });
    },
    disabled: sortDisabled
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "mb-20 flex h-172 items-stretch rounded-panel border bg-paper shadow",
      ref: itemRef,
      ...sortableProps,
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: clsx(
              "flex-shrink-0 border-r px-10 text-muted",
              !sortDisabled && "hover:text-primary"
            ),
            disabled: sortDisabled,
            ref: dragHandleRef,
            children: /* @__PURE__ */ jsx(DragIndicatorIcon, {})
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-auto p-24", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            title && /* @__PURE__ */ jsx("div", { className: "mb-4 mr-auto flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap font-medium", children: title }),
            updateDialog && /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  className: "ml-20 flex-shrink-0",
                  variant: "text",
                  color: "primary",
                  startIcon: /* @__PURE__ */ jsx(EditIcon, {}),
                  children: /* @__PURE__ */ jsx(Trans, { message: "Edit" })
                }
              ),
              updateDialog
            ] }),
            biolink && item && /* @__PURE__ */ jsx(DetachContentItemButton, { item })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-20", children }),
          actionRow
        ] })
      ]
    }
  );
}
const linkDialogHiddenFields = [
  "groups",
  "seo",
  "enabled",
  "alias"
];
function LinkContentItem({ item: link, biolink }) {
  const biolinkId = useEditorBiolinkId();
  const endpoint2 = `biolink/${biolinkId}/link/${link.id}`;
  return /* @__PURE__ */ jsx(
    BiolinkContentItemLayout,
    {
      item: link,
      biolink,
      title: link.name,
      actionRow: /* @__PURE__ */ jsx(ActionRow$1, { link, biolink }),
      updateDialog: /* @__PURE__ */ jsx(
        UpdateLinkDialog,
        {
          endpoint: endpoint2,
          link,
          showButtonLabelField: true,
          hiddenFields: linkDialogHiddenFields,
          onSuccess: (response) => {
            setEditorBiolink(response.biolink);
          }
        }
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsx(RemoteFavicon, { url: link.long_url }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: link.short_url,
            target: "_blank",
            className: "hover:underline whitespace-nowrap overflow-hidden overflow-ellipsis text-muted text-sm",
            rel: "noreferrer",
            children: removeProtocol(link.long_url)
          }
        )
      ] })
    }
  );
}
function ActionRow$1({ link, biolink }) {
  const updateItem2 = useUpdateBiolinkContentItem();
  return /* @__PURE__ */ jsxs("div", { className: "flex md:gap-24 md:justify-between h-42 items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center text-muted", children: [
      /* @__PURE__ */ jsx(
        Switch,
        {
          checked: link.active,
          disabled: link.active_locked || updateItem2.isPending,
          onChange: () => {
            updateItem2.mutate({
              item: link,
              values: { active: !link.active }
            });
          }
        }
      ),
      /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Change thumbnail" }), children: /* @__PURE__ */ jsx(IconButton, { className: "ml-10", color: link.image ? "primary" : null, children: /* @__PURE__ */ jsx(ImageIcon, {}) }) }),
        /* @__PURE__ */ jsx(LinkThumbnailDialog, { link })
      ] }),
      /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Animation" }), children: /* @__PURE__ */ jsx(IconButton, { color: link.animation ? "primary" : null, children: /* @__PURE__ */ jsx(AnimationIcon, {}) }) }),
        /* @__PURE__ */ jsx(LinkAnimationDialog, { link })
      ] }),
      /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Redirect" }), children: /* @__PURE__ */ jsx(IconButton, { color: link.leap_until ? "primary" : null, children: /* @__PURE__ */ jsx(ShortcutIcon, {}) }) }),
        /* @__PURE__ */ jsx(LeapLinkDialog, { link })
      ] }),
      /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Schedule" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            color: link.expires_at || link.activates_at ? "primary" : null,
            children: /* @__PURE__ */ jsx(MoreTimeIcon, {})
          }
        ) }),
        /* @__PURE__ */ jsx(LinkScheduleDialog, { link })
      ] })
    ] }),
    /* @__PURE__ */ jsx(ClicksButton, { link })
  ] });
}
function ClicksButton({ link }) {
  const isMobile = useIsMobileMediaQuery();
  const isVerySmallScreen = useMediaQuery("(max-width: 380px)");
  if (isVerySmallScreen) {
    return null;
  }
  const clicksReportPath = `../../../../links/${link.id}`;
  const button = isMobile ? /* @__PURE__ */ jsx(
    IconButton,
    {
      className: "text-muted flex-shrink-0",
      elementType: Link,
      to: clicksReportPath,
      relative: "path",
      children: /* @__PURE__ */ jsx(BarChartIcon, {})
    }
  ) : /* @__PURE__ */ jsx(
    Button,
    {
      variant: "text",
      className: "text-muted",
      startIcon: /* @__PURE__ */ jsx(BarChartIcon, {}),
      elementType: Link,
      to: clicksReportPath,
      relative: "path",
      children: /* @__PURE__ */ jsx(Trans, { message: ":count clicks", values: { count: link.clicks_count } })
    }
  );
  return /* @__PURE__ */ jsx(
    Tooltip,
    {
      label: /* @__PURE__ */ jsx(
        Trans,
        {
          message: ":count lifetime clicks",
          values: { count: link.clicks_count }
        }
      ),
      children: button
    }
  );
}
function useUpdateBiolink(form, biolinkId) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => updateBiolink(biolinkId, payload),
    onSuccess: () => {
      toast.positive(trans(message("Biolink updated")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("biolink")
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateBiolink(biolinkId, payload) {
  return apiClient.put(
    `biolink/${biolinkId}`,
    buildLinkeablePayload(payload)
  ).then((r) => r.data);
}
const hiddenLinkSettingsFields = [
  "type",
  "groups",
  "title"
];
function BiolinkSettingsForm() {
  const { biolink } = useEditorBiolink();
  if (!biolink) {
    return /* @__PURE__ */ jsx("div", { className: "py-24", children: /* @__PURE__ */ jsx(FullPageLoader, {}) });
  }
  return /* @__PURE__ */ jsx(SettingsForm, { biolink });
}
function SettingsForm({ biolink }) {
  const form = useForm({
    defaultValues: buildLinkeableDefaultFormValues(biolink)
  });
  const updateSettings = useUpdateBiolink(form, biolink.id);
  return /* @__PURE__ */ jsxs(
    Form,
    {
      form,
      onBeforeSubmit: () => {
        form.clearErrors("hash");
      },
      onSubmit: (values) => {
        updateSettings.mutate(values);
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "mb-24", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            variant: "flat",
            color: "primary",
            disabled: updateSettings.isPending || !form.formState.isDirty,
            children: /* @__PURE__ */ jsx(Trans, { message: "Update" })
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "mb-24", children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "name",
              label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
              minLength: 3,
              className: "mb-8",
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsx(AliasField, { form, name: "hash" })
        ] }),
        /* @__PURE__ */ jsx(
          LinkSettingsForm,
          {
            hiddenFields: hiddenLinkSettingsFields,
            linkName: /* @__PURE__ */ jsx(Trans, { message: "biolink" })
          }
        )
      ]
    }
  );
}
function useCrupdateBiolinkWidget(biolinkId, form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => createWidget(biolinkId, payload),
    onSuccess: (response, payload) => {
      toast.positive(
        trans(
          !payload.widgetId ? message("Widget updated") : message("Widget added")
        )
      );
      setEditorBiolink(response.biolink);
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createWidget(biolinkId, { widgetId, ...payload }) {
  const request = widgetId ? apiClient.put(`biolink/${biolinkId}/widget/${widgetId}`, payload) : apiClient.post(`biolink/${biolinkId}/widget`, payload);
  return request.then((r) => r.data);
}
function CrupdateWidgetDialog({
  biolink,
  widget,
  type,
  defaultValues,
  children,
  onSubmit
}) {
  const widgetListItem = WidgetList[type];
  const cleanedValues = useMemo(() => {
    const values = (widget == null ? void 0 : widget.config) || defaultValues;
    const isEmpty = Array.isArray(values) && values.length === 0 || !values;
    return isEmpty ? void 0 : values;
  }, [widget == null ? void 0 : widget.config, defaultValues]);
  const form = useForm({
    defaultValues: cleanedValues
  });
  const { formId, close } = useDialogContext();
  const addWidget = useCrupdateBiolinkWidget(biolink.id, form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { ...widgetListItem.name }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        form,
        id: formId,
        onSubmit: async (values) => {
          const transformedValues = onSubmit ? await onSubmit(values, form) : values;
          if (transformedValues === void 0) {
            return;
          }
          addWidget.mutate(
            {
              widgetId: widget == null ? void 0 : widget.id,
              config: transformedValues,
              type,
              // put socials widget at the end (when creating a new widget), everything else at the start
              position: !widget && type === WidgetType.Socials ? biolink.content.length + 1 : void 0
            },
            { onSuccess: () => close() }
          );
        },
        children
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: addWidget.isPending || !form.formState.isDirty,
          children: widget ? /* @__PURE__ */ jsx(Trans, { message: "Update" }) : /* @__PURE__ */ jsx(Trans, { message: "Add" })
        }
      )
    ] })
  ] });
}
function ImageWidgetDialog({
  biolink,
  widget
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs(
    CrupdateWidgetDialog,
    {
      biolink,
      type: WidgetType.Image,
      widget,
      children: [
        /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(FormImageSelector, { name: "url", diskPrefix: "widgets", required: true }) }),
        /* @__PURE__ */ jsxs(
          FormSelect,
          {
            className: "my-24",
            name: "type",
            label: /* @__PURE__ */ jsx(Trans, { message: "Style" }),
            selectionMode: "single",
            children: [
              /* @__PURE__ */ jsx(Item, { value: "default", children: /* @__PURE__ */ jsx(Trans, { message: "Default" }) }),
              /* @__PURE__ */ jsx(Item, { value: "avatar", children: /* @__PURE__ */ jsx(Trans, { message: "Avatar" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            placeholder: trans(message("Optional")),
            name: "destinationUrl",
            type: "url",
            label: /* @__PURE__ */ jsx(Trans, { message: "Destination url" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Redirect user to this url when clicking the image." })
          }
        )
      ]
    }
  );
}
const imageThumbnail = "/assets/image-d8dc8345.png";
const textImage = "/assets/text-e5f73930.png";
const socialsImage = "/assets/socials-7d34b331.png";
const youtubeImage = "/assets/youtube-8639db0d.png";
const soundcloudImage = "/assets/soundcloud-a6ae8fd9.png";
const vimeoImage = "/assets/vimeo-f698adf6.jpeg";
const spotifyImage = "/assets/spotify-45316d66.png";
const twitchImage = "/assets/twitch-7d18ac0c.svg";
const tiktokImage = "/assets/tiktok-956e4d3e.png";
function YoutubeWidgetDialog({
  biolink,
  widget
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    CrupdateWidgetDialog,
    {
      biolink,
      type: WidgetType.Youtube,
      widget,
      onSubmit: (values, form) => {
        const youtubeId = getVideoId(values.url).id;
        if (!youtubeId) {
          form.setError("url", {
            message: trans(message("Invalid youtube url"))
          });
        } else {
          return Promise.resolve(values);
        }
      },
      children: /* @__PURE__ */ jsx(
        FormTextField,
        {
          required: true,
          autoFocus: true,
          placeholder: "https://www.youtube.com/watch?v=YE7VzlLtp-4",
          name: "url",
          type: "url",
          label: /* @__PURE__ */ jsx(Trans, { message: "Youtube video url" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Embed this youtube video within biolink." })
        }
      )
    }
  );
}
function TextWidgetDialog({ biolink, widget }) {
  return /* @__PURE__ */ jsxs(
    CrupdateWidgetDialog,
    {
      biolink,
      type: WidgetType.Text,
      widget,
      children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            className: "mb-24",
            required: true,
            autoFocus: true,
            name: "title",
            label: /* @__PURE__ */ jsx(Trans, { message: "Title" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "description",
            inputElementType: "textarea",
            rows: 2,
            label: /* @__PURE__ */ jsx(Trans, { message: "Description" })
          }
        )
      ]
    }
  );
}
function SocialsWidgetDialog({ biolink, widget }) {
  return /* @__PURE__ */ jsx(
    CrupdateWidgetDialog,
    {
      biolink,
      type: WidgetType.Socials,
      widget,
      onSubmit: (values) => {
        return Promise.resolve(removeEmptyValuesFromObject(values));
      },
      children: Object.entries(SocialsList).map(([type, social], index) => {
        const Icon = social.icon;
        return /* @__PURE__ */ jsx(
          FormTextField,
          {
            autoFocus: index === 0,
            className: "mb-24",
            name: type,
            placeholder: social.placeholder,
            label: /* @__PURE__ */ jsx(Trans, { ...social.name }),
            pattern: social.pattern,
            type: social.inputType,
            autoComplete: "off",
            startAdornment: Icon && /* @__PURE__ */ jsx(Icon, {})
          },
          type
        );
      })
    }
  );
}
function TwitchWidgetDialog({
  biolink,
  widget
}) {
  return /* @__PURE__ */ jsx(
    CrupdateWidgetDialog,
    {
      biolink,
      type: WidgetType.Twitch,
      widget,
      children: /* @__PURE__ */ jsx(
        FormTextField,
        {
          required: true,
          autoFocus: true,
          placeholder: "https://www.twitch.tv/kasparovchess",
          name: "url",
          type: "url",
          pattern: "https://(www.)?twitch.tv/.*",
          label: /* @__PURE__ */ jsx(Trans, { message: "Twitch channel or clip url" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Embed this twitch channel or clip within biolink." })
        }
      )
    }
  );
}
function SoundcloudWidgetDialog({
  biolink,
  widget
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    CrupdateWidgetDialog,
    {
      biolink,
      type: WidgetType.Soundcloud,
      widget,
      onSubmit: async (values, form) => {
        var _a2;
        const encodedUrl = encodeURIComponent(values.url);
        const response = await fetch(
          `https://soundcloud.com/oembed?format=json&url=${encodedUrl}`
        ).then((res) => res.json());
        const embedCode = response.html;
        const div = document.createElement("div");
        div.innerHTML = embedCode;
        const embedUrl = (_a2 = div.querySelector("iframe")) == null ? void 0 : _a2.src;
        if (embedUrl) {
          return {
            ...values,
            embedUrl
          };
        }
        form.setError("url", {
          message: trans(message("Invalid soundcloud url"))
        });
      },
      children: /* @__PURE__ */ jsx(
        FormTextField,
        {
          required: true,
          autoFocus: true,
          placeholder: "https://soundcloud.com/artist/track",
          name: "url",
          type: "url",
          label: /* @__PURE__ */ jsx(Trans, { message: "Soundcloud track url" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Embed this soundcloud track within biolink." })
        }
      )
    }
  );
}
function VimeoWidgetDialog({ biolink, widget }) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    CrupdateWidgetDialog,
    {
      biolink,
      type: WidgetType.Vimeo,
      widget,
      onSubmit: (values, form) => {
        const vimeoId = getVideoId(values.url).id;
        if (!vimeoId) {
          form.setError("url", {
            message: trans(message("Invalid vimeo url"))
          });
        } else {
          return Promise.resolve(values);
        }
      },
      children: /* @__PURE__ */ jsx(
        FormTextField,
        {
          required: true,
          autoFocus: true,
          placeholder: "https://vimeo.com/1084537",
          name: "url",
          type: "url",
          label: /* @__PURE__ */ jsx(Trans, { message: "Vimeo video url" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Embed this vimeo video within biolink." })
        }
      )
    }
  );
}
function SpotifyWidgetDialog({
  biolink,
  widget
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    CrupdateWidgetDialog,
    {
      biolink,
      type: WidgetType.Spotify,
      widget,
      onSubmit: (values, form) => {
        const spotifyInfo = parse(values.url);
        if (!("id" in spotifyInfo)) {
          form.setError("url", {
            message: trans(message("Invalid spotify url"))
          });
        } else {
          return Promise.resolve({
            ...values,
            type: spotifyInfo.type
          });
        }
      },
      children: /* @__PURE__ */ jsx(
        FormTextField,
        {
          required: true,
          autoFocus: true,
          placeholder: "https://open.spotify.com/track/2sqfLwGKXDw1nGjFhH3GGX?si=f329040f45804ec5",
          name: "url",
          type: "url",
          label: /* @__PURE__ */ jsx(Trans, { message: "Spotify share url" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Any share url from spotify can be used, including artist, album, track, playlist etc." })
        }
      )
    }
  );
}
function TiktokWidgetDialog({ biolink, widget }) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    CrupdateWidgetDialog,
    {
      biolink,
      type: WidgetType.Tiktok,
      widget,
      onSubmit: (values, form) => {
        if (!values.url.includes("tiktok.com/")) {
          form.setError("url", {
            message: trans(message("Invalid tiktok url"))
          });
        } else {
          return Promise.resolve(values);
        }
      },
      children: /* @__PURE__ */ jsx(
        FormTextField,
        {
          required: true,
          autoFocus: true,
          placeholder: "https://www.tiktok.com/@bts_official_bighit/video/6964945720885464322",
          name: "url",
          type: "url",
          label: /* @__PURE__ */ jsx(Trans, { message: "Tiktok url" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Embed this tiktok video within biolink." })
        }
      )
    }
  );
}
var WidgetType = /* @__PURE__ */ ((WidgetType2) => {
  WidgetType2["Image"] = "image";
  WidgetType2["Text"] = "text";
  WidgetType2["Socials"] = "socials";
  WidgetType2["Youtube"] = "youtube";
  WidgetType2["Soundcloud"] = "soundcloud";
  WidgetType2["Vimeo"] = "video";
  WidgetType2["Spotify"] = "spotify";
  WidgetType2["Twitch"] = "twitch";
  WidgetType2["Tiktok"] = "tiktok";
  return WidgetType2;
})(WidgetType || {});
const WidgetList = {
  [
    "image"
    /* Image */
  ]: {
    name: message("Image"),
    image: imageThumbnail,
    description: message(
      "Upload an image and optionally add a link it will redirect to when clicked."
    ),
    dialog: ImageWidgetDialog
  },
  [
    "text"
    /* Text */
  ]: {
    name: message("Text"),
    image: textImage,
    description: message(
      "Add title and optional description. Can be used as a header for the whole biolink or a group of multiple widgets."
    ),
    dialog: TextWidgetDialog
  },
  [
    "socials"
    /* Socials */
  ]: {
    name: message("Social Links"),
    image: socialsImage,
    description: message(
      "Add your socials links to display them as icon buttons."
    ),
    dialog: SocialsWidgetDialog
  },
  [
    "youtube"
    /* Youtube */
  ]: {
    name: message("Youtube Video"),
    image: youtubeImage,
    description: message(
      "Paste a YouTube video URL to show it as a video embed in your profile."
    ),
    dialog: YoutubeWidgetDialog
  },
  [
    "soundcloud"
    /* Soundcloud */
  ]: {
    name: message("Soundcloud Audio"),
    image: soundcloudImage,
    description: message(
      "Paste a SoundCloud URL to show it as a playable song in your profile."
    ),
    dialog: SoundcloudWidgetDialog
  },
  [
    "video"
    /* Vimeo */
  ]: {
    name: message("Vimeo Video"),
    image: vimeoImage,
    description: message(
      "Paste a vimeo URL to show it as a video embed in your profile."
    ),
    dialog: VimeoWidgetDialog
  },
  [
    "spotify"
    /* Spotify */
  ]: {
    name: message("Spotify Embed"),
    image: spotifyImage,
    description: message(
      "Paste a spotify song, album, artist, playlist, podcast or episode url to show it as an embed in your profile."
    ),
    dialog: SpotifyWidgetDialog
  },
  [
    "twitch"
    /* Twitch */
  ]: {
    name: message("Twitch Embed"),
    image: twitchImage,
    description: message(
      "Paste twitch profile or clip url to show it as an embed in your profile."
    ),
    dialog: TwitchWidgetDialog
  },
  [
    "tiktok"
    /* Tiktok */
  ]: {
    name: message("TikTok Embed"),
    image: tiktokImage,
    description: message(
      "Paste TikTok video url to show it as an embed in your profile."
    ),
    dialog: TiktokWidgetDialog
  }
};
function SelectWidgetDialog() {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { size: "xl", children: [
    /* @__PURE__ */ jsx(DialogHeader, { titleTextSize: "text-md", padding: "px-24 pt-14 pb-4", children: /* @__PURE__ */ jsx(Trans, { message: "Add widget" }) }),
    /* @__PURE__ */ jsx(DialogBody, { padding: "p-24", children: /* @__PURE__ */ jsx("div", { className: "grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3", children: Object.entries(WidgetList).map(([widgetType, widget]) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-paper border rounded p-14 shadow cursor-pointer hover:bg-primary/hover",
        role: "button",
        tabIndex: 0,
        onClick: () => {
          close(widgetType);
        },
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: widget.image,
              alt: "",
              className: "block w-54 h-54 mb-20 mr-auto"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "text-primary text-lg font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis", children: /* @__PURE__ */ jsx(Trans, { ...widget.name }) }),
          /* @__PURE__ */ jsx("div", { className: "text-muted", children: /* @__PURE__ */ jsx(Trans, { ...widget.description }) })
        ]
      },
      widgetType
    )) }) })
  ] });
}
function NewWidgetDialogContainer({
  activeWidget,
  biolink,
  onOpenChange
}) {
  const Dialog2 = activeWidget ? WidgetList[activeWidget].dialog : null;
  return /* @__PURE__ */ jsx(
    DialogTrigger,
    {
      type: "modal",
      isOpen: activeWidget != null,
      onOpenChange,
      children: Dialog2 && /* @__PURE__ */ jsx(Dialog2, { biolink })
    }
  );
}
const ArrowUpwardIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" }),
  "ArrowUpwardOutlined"
);
function WidgetContentItem({
  item: widget,
  biolink
}) {
  const config = WidgetList[widget.type];
  const WidgetRenderer = WidgetRenderers[widget.type];
  const WidgetDialog = config.dialog;
  return /* @__PURE__ */ jsx(
    BiolinkContentItemLayout,
    {
      biolink,
      item: widget,
      title: /* @__PURE__ */ jsx(Trans, { ...config.name }),
      updateDialog: /* @__PURE__ */ jsx(WidgetDialog, { widget, biolink }),
      actionRow: /* @__PURE__ */ jsx(ActionRow, { widget }),
      children: /* @__PURE__ */ jsx(WidgetRenderer, { widget, variant: "editor" })
    }
  );
}
function ActionRow({ widget }) {
  const updateItem2 = useUpdateBiolinkContentItem();
  const sortContent2 = useSortBiolinkContent();
  const handlePinToTop = () => {
    const biolink = biolinkEditorState().biolink;
    if (!biolink)
      return;
    const pinnedCount = biolink.content.filter((x) => x.pinned === "top").length;
    if (!widget.pinned) {
      const oldIndex = biolink.content.findIndex(
        (x) => x.model_type === widget.model_type && x.id === widget.id
      );
      sortContent2.mutate({
        oldIndex,
        // pinned widget after any other widgets that are already pinned to top
        newIndex: pinnedCount,
        widgetToPin: widget.id
      });
    } else {
      updateItem2.mutate({ item: widget, values: { pinned: null } });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24 justify-between text-muted h-42", children: [
    /* @__PURE__ */ jsx(
      Switch,
      {
        checked: widget.active,
        disabled: updateItem2.isPending,
        onChange: () => {
          updateItem2.mutate({
            item: widget,
            values: {
              active: !widget.active
            }
          });
        }
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        size: "2xs",
        radius: "rounded-full",
        color: widget.pinned === "top" ? "primary" : void 0,
        startIcon: widget.pinned === "top" ? /* @__PURE__ */ jsx(ArrowDownwardIcon, {}) : /* @__PURE__ */ jsx(ArrowUpwardIcon, {}),
        disabled: sortContent2.isPending,
        onClick: handlePinToTop || updateItem2.isPending,
        children: widget.pinned === "top" ? /* @__PURE__ */ jsx(Trans, { message: "Unpin from top" }) : /* @__PURE__ */ jsx(Trans, { message: "Pin to top" })
      }
    )
  ] });
}
function LivePreview() {
  const { biolink } = useEditorBiolink();
  const appearance = useBiolinkEditorStore((s) => s.appearance);
  const isTablet = useIsTabletMediaQuery();
  if (isTablet) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "sticky top-24 h-max flex-shrink-0", children: [
    /* @__PURE__ */ jsx(
      Chip,
      {
        size: "sm",
        color: "positive",
        radius: "rounded",
        className: "m-auto mb-24 w-max",
        children: /* @__PURE__ */ jsx(Trans, { message: "Live preview" })
      }
    ),
    /* @__PURE__ */ jsx(PhoneSkeleton, { children: biolink ? /* @__PURE__ */ jsx(
      BiolinkLayout,
      {
        biolink,
        appearance,
        height: "h-full"
      }
    ) : null }),
    /* @__PURE__ */ jsx("div", { className: "mt-14 text-center text-sm text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "Scheduled and disabled content is not shown" }) })
  ] });
}
function PhoneSkeleton({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "h-[724px] w-350 overflow-hidden rounded-[64px] border border-[12px] border-[#444546] shadow-lg", children: /* @__PURE__ */ jsx("div", { className: "compact-scrollbar h-full overflow-y-auto", children }) });
}
const appearanceHeaderClassnames = {
  h2: "text-xl font-semibold mb-20",
  h3: "my-12 font-semibold"
};
const FormatColorFillIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16.56 8.94 7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10 10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5zM2 20h20v4H2v-4z" }),
  "FormatColorFillOutlined"
);
const GradientIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 9h2v2h-2V9zm-2 2h2v2H9v-2zm4 0h2v2h-2v-2zm2-2h2v2h-2V9zM7 9h2v2H7V9zm12-6H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 18H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm2-7h-2v2h2v2h-2v-2h-2v2h-2v-2h-2v2H9v-2H7v2H5v-2h2v-2H5V5h14v6z" }),
  "GradientOutlined"
);
const BackgroundSelectorButton = forwardRef(({ isActive, children, className, style, label, ...buttonProps }, ref) => {
  return /* @__PURE__ */ jsxs("button", { type: "button", ...buttonProps, ref, children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        className: clsx(
          "flex aspect-square items-center justify-center overflow-hidden rounded-panel border border-[#c3cbdc] outline-none focus-visible:ring",
          isActive && "ring-2 ring-primary ring-offset-2",
          className
        ),
        style,
        children
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "mt-10 block overflow-hidden overflow-ellipsis text-xs", children: label })
  ] });
});
function ColorBackgroundTab({
  value,
  onChange,
  className,
  isInsideDialog
}) {
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx(
      CustomColorButton,
      {
        value,
        onChange,
        isInsideDialog
      }
    ),
    ColorBackgrounds.map((background) => /* @__PURE__ */ jsx(
      BackgroundSelectorButton,
      {
        label: /* @__PURE__ */ jsx(Trans, { ...background.label }),
        isActive: (value == null ? void 0 : value.id) === background.id,
        style: { backgroundColor: background.backgroundColor },
        onClick: () => {
          onChange == null ? void 0 : onChange({
            ...BaseColorBg,
            ...background
          });
        }
      },
      background.id
    ))
  ] });
}
function CustomColorButton({
  value,
  onChange,
  isInsideDialog
}) {
  const isCustomColor = (value == null ? void 0 : value.id) === BaseColorBg.id;
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "popover",
      alwaysReturnCurrentValueOnClose: isInsideDialog,
      value: value == null ? void 0 : value.backgroundColor,
      onValueChange: (newColor) => {
        onChange == null ? void 0 : onChange({
          ...BaseColorBg,
          backgroundColor: newColor
        });
      },
      onClose: (newValue) => {
        onChange == null ? void 0 : onChange({ ...BaseColorBg, backgroundColor: newValue });
      },
      children: [
        /* @__PURE__ */ jsx(
          BackgroundSelectorButton,
          {
            label: /* @__PURE__ */ jsx(Trans, { ...BaseColorBg.label }),
            className: "border-2 border-dashed",
            style: {
              backgroundColor: isCustomColor ? value == null ? void 0 : value.backgroundColor : void 0
            },
            children: /* @__PURE__ */ jsx("span", { className: "inline-block rounded bg-black/20 p-10 text-white", children: /* @__PURE__ */ jsx(FormatColorFillIcon, { size: "lg" }) })
          }
        ),
        /* @__PURE__ */ jsx(ColorPickerDialog, { hideFooter: isInsideDialog })
      ]
    }
  );
}
const ArrowForwardIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" }),
  "ArrowForwardOutlined"
);
const BaseGradientBg = {
  type: "gradient",
  id: "g-custom",
  label: message("Custom gradient")
};
const GradientBackgrounds = [
  {
    ...BaseGradientBg,
    id: "g1",
    backgroundImage: "linear-gradient(45deg, #ff9a9e, #fad0c4)",
    label: message("Worm flame")
  },
  {
    ...BaseGradientBg,
    id: "g2",
    backgroundImage: "linear-gradient(0deg, #a18cd1, #fbc2eb)",
    label: message("Night fade")
  },
  {
    ...BaseGradientBg,
    id: "g3",
    backgroundImage: "linear-gradient(120deg, #a1c4fd, #c2e9fb)",
    label: message("Winter nova")
  },
  {
    ...BaseGradientBg,
    id: "g4",
    backgroundImage: "linear-gradient(0deg, #cfd9df, #e2ebf0)",
    label: message("Heavy rain")
  },
  {
    ...BaseGradientBg,
    id: "g5",
    backgroundImage: "linear-gradient(120deg, #fdfbfb, #ebedee)",
    label: message("Cloudy knoxville")
  },
  {
    ...BaseGradientBg,
    id: "g6",
    backgroundImage: "linear-gradient(0deg, #a8edea, #fed6e3)",
    label: message("Rare wind")
  },
  {
    ...BaseGradientBg,
    id: "g7",
    backgroundImage: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    label: message("Saint petersburg")
  },
  {
    ...BaseGradientBg,
    id: "g8",
    backgroundImage: "linear-gradient(135deg, #fdfcfb, #e2d1c3)",
    label: message("Everlasting sky")
  },
  {
    ...BaseGradientBg,
    id: "g9",
    backgroundImage: "linear-gradient(0deg, #c1dfc4, #deecdd)",
    label: message("Soft grass")
  },
  {
    ...BaseGradientBg,
    id: "g10",
    backgroundImage: "linear-gradient(90deg, #E9E4F0, #D3CCE3)",
    label: message("Delicate")
  },
  {
    ...BaseGradientBg,
    id: "g11",
    backgroundImage: "linear-gradient(90deg, #fffcdc, #d9a7c7)",
    label: message("Broken hearts")
  },
  {
    ...BaseGradientBg,
    id: "g12",
    backgroundImage: "linear-gradient(90deg, #56ab2f, #a8e063)",
    label: message("Lush"),
    color: "rgb(255, 255, 255)"
  },
  {
    ...BaseGradientBg,
    id: "g13",
    backgroundImage: "linear-gradient(90deg, #606c88, #3f4c6b)",
    label: message("Ash"),
    color: "rgb(255, 255, 255)"
  },
  {
    ...BaseGradientBg,
    id: "g14",
    backgroundImage: "linear-gradient(90deg, #ece9e6, #ffffff)",
    label: message("Clouds")
  },
  {
    ...BaseGradientBg,
    id: "g15",
    backgroundImage: "linear-gradient(90deg, #f09819, #edde5d)",
    label: message("Mango pulp")
  },
  {
    ...BaseGradientBg,
    id: "g16",
    backgroundImage: "linear-gradient(90deg, #b79891, #94716b)",
    label: message("Cooper"),
    color: "rgb(255, 255, 255)"
  },
  {
    ...BaseGradientBg,
    id: "g17",
    backgroundImage: "linear-gradient(60deg, #29323c, #485563)",
    label: message("Vicious stance"),
    color: "rgb(255, 255, 255)"
  }
];
function GradientBackgroundTab({
  value,
  onChange,
  className,
  isInsideDialog
}) {
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx(
      CustomGradientButton,
      {
        value,
        onChange,
        isInsideDialog
      }
    ),
    GradientBackgrounds.map((gradient) => /* @__PURE__ */ jsx(
      BackgroundSelectorButton,
      {
        label: gradient.label && /* @__PURE__ */ jsx(Trans, { ...gradient.label }),
        isActive: (value == null ? void 0 : value.id) === gradient.id,
        style: { backgroundImage: gradient.backgroundImage },
        onClick: () => {
          onChange == null ? void 0 : onChange({
            ...BaseGradientBg,
            ...gradient
          });
        }
      },
      gradient.backgroundImage
    ))
  ] });
}
function CustomGradientButton({
  value,
  onChange,
  isInsideDialog
}) {
  const isCustomGradient = (value == null ? void 0 : value.id) === BaseGradientBg.id;
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "popover",
      value,
      onValueChange: (newValue) => onChange == null ? void 0 : onChange(newValue),
      alwaysReturnCurrentValueOnClose: isInsideDialog,
      onOpenChange: (isOpen) => {
        if (isOpen && !value) {
          onChange == null ? void 0 : onChange(GradientBackgrounds[0]);
        }
      },
      onClose: (gradient) => onChange == null ? void 0 : onChange(gradient),
      children: [
        /* @__PURE__ */ jsx(
          BackgroundSelectorButton,
          {
            label: /* @__PURE__ */ jsx(Trans, { ...BaseGradientBg.label }),
            className: "border-2 border-dashed",
            style: {
              backgroundImage: isCustomGradient ? value == null ? void 0 : value.backgroundImage : void 0
            },
            children: /* @__PURE__ */ jsx("span", { className: "inline-block rounded bg-black/20 p-10 text-white", children: /* @__PURE__ */ jsx(GradientIcon, { size: "lg" }) })
          }
        ),
        /* @__PURE__ */ jsx(CustomGradientDialog, { hideFooter: isInsideDialog })
      ]
    }
  );
}
function CustomGradientDialog({ hideFooter }) {
  const {
    close,
    value: dialogValue,
    setValue
  } = useDialogContext();
  const [state, setLocalState] = useState(() => {
    var _a2;
    const parts = ((_a2 = dialogValue == null ? void 0 : dialogValue.backgroundImage) == null ? void 0 : _a2.match(/\(([0-9]+deg),.?(.+?),.?(.+?)\)/)) || [];
    return {
      angle: parts[1] || "45deg",
      colorOne: parts[2] || "#ff9a9e",
      colorTwo: parts[3] || "#fad0c4"
    };
  });
  const buildGradientBackground = (s) => {
    return {
      ...BaseGradientBg,
      backgroundImage: `linear-gradient(${s.angle}, ${s.colorOne}, ${s.colorTwo})`
    };
  };
  const setState = useCallback(
    (newValues) => {
      const newState = {
        ...state,
        ...newValues
      };
      setLocalState(newState);
      setValue(buildGradientBackground(newState));
    },
    [state, setValue]
  );
  return /* @__PURE__ */ jsxs(Dialog, { size: "sm", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Custom gradient" }) }),
    /* @__PURE__ */ jsxs(DialogBody, { children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(Trans, { message: "Colors" }) }),
      /* @__PURE__ */ jsxs("div", { className: "mb-20 flex h-40 items-stretch", children: [
        /* @__PURE__ */ jsx(
          ColorPickerButton,
          {
            className: "rounded-input",
            value: state.colorOne,
            onChange: (value) => setState({ colorOne: value })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex-auto border-y border-[#c3cbdc]",
            style: {
              backgroundImage: buildGradientBackground(state).backgroundImage
            }
          }
        ),
        /* @__PURE__ */ jsx(
          ColorPickerButton,
          {
            className: "rounded-r-input",
            value: state.colorTwo,
            onChange: (value) => setState({ colorTwo: value })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(Trans, { message: "Direction" }) }),
      /* @__PURE__ */ jsx(
        DirectionButtons,
        {
          value: state.angle,
          onChange: (value) => setState({ angle: value })
        }
      )
    ] }),
    !hideFooter && /* @__PURE__ */ jsxs(DialogFooter, { dividerTop: true, children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          onClick: () => close(buildGradientBackground(state)),
          children: /* @__PURE__ */ jsx(Trans, { message: "Apply" })
        }
      )
    ] })
  ] });
}
function ColorPickerButton({
  className,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "popover",
      value,
      onValueChange: onChange,
      alwaysReturnCurrentValueOnClose: true,
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Click to change color" }), children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: clsx(
              "w-40 flex-shrink-0 border border-[#c3cbdc]",
              className
            ),
            style: { backgroundColor: value }
          }
        ) }),
        /* @__PURE__ */ jsx(ColorPickerDialog, { hideFooter: true })
      ]
    }
  );
}
function DirectionButtons({ value, onChange }) {
  const activeStyle = "text-primary border-primary";
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-8 text-muted", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        variant: "outline",
        className: value === "0deg" ? activeStyle : void 0,
        onClick: () => onChange("0deg"),
        children: /* @__PURE__ */ jsx(ArrowUpwardIcon, {})
      }
    ),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        variant: "outline",
        className: value === "180deg" ? activeStyle : void 0,
        onClick: () => onChange("180deg"),
        children: /* @__PURE__ */ jsx(ArrowDownwardIcon, {})
      }
    ),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        variant: "outline",
        className: value === "90deg" ? activeStyle : void 0,
        onClick: () => onChange("90deg"),
        children: /* @__PURE__ */ jsx(ArrowForwardIcon, {})
      }
    ),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        variant: "outline",
        className: value === "135deg" ? activeStyle : void 0,
        onClick: () => onChange("135deg"),
        children: /* @__PURE__ */ jsx(ArrowDownwardIcon, { className: "-rotate-45" })
      }
    ),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        variant: "outline",
        className: value === "225deg" ? activeStyle : void 0,
        onClick: () => onChange("225deg"),
        children: /* @__PURE__ */ jsx(ArrowDownwardIcon, { className: "rotate-45" })
      }
    ),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        variant: "outline",
        className: value === "45deg" ? activeStyle : void 0,
        onClick: () => onChange("45deg"),
        children: /* @__PURE__ */ jsx(ArrowUpwardIcon, { className: "rotate-45" })
      }
    ),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        variant: "outline",
        className: value === "325deg" ? activeStyle : void 0,
        onClick: () => onChange("325deg"),
        children: /* @__PURE__ */ jsx(ArrowUpwardIcon, { className: "-rotate-45" })
      }
    )
  ] });
}
const UploadIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9 16h6v-6h4l-7-7-7 7h4v6zm3-10.17L14.17 8H13v6h-2V8H9.83L12 5.83zM5 18h14v2H5z" }),
  "UploadOutlined"
);
const angledFocus = "/assets/Angled-Focus-176ea4bb.svg";
const circularFocus = "/assets/Circular-Focus-ca4d12f0.svg";
const farseeingEyeball = "/assets/Farseeing-Eyeball-aa4a0249.svg";
const canyonFunnel = "/assets/Canyon-Funnel-b2e2eaf0.svg";
const looneyLoops = "/assets/Looney-Loops-6f56821b.svg";
const hurricaneAperture = "/assets/Hurricane-Aperture-35c89ecf.svg";
const icyExplosion = "/assets/Icy-Explosion-988bfd47.svg";
const protrudingSquares = "/assets/Protruding-Squares-b00abf9b.svg";
const alternatingTriangles = "/assets/Alternating-Triangles-d5e42a92.svg";
const monsteraPatch = "/assets/Monstera-Patch-69fc9117.svg";
const confettiDoodles = "/assets/Confetti-Doodles-d1c20c3c.svg";
const threadsAhead = "/assets/Threads-Ahead-28db1646.svg";
const launchDay = "/assets/Launch-Day-f2926785.svg";
const sprinkle = "/assets/Sprinkle-d1a9b59f.svg";
const circuitBoard = "/assets/Circuit-Board-b3635293.svg";
const nuclearFocalPoint = "/assets/nuclear-focalpoint-166680aa.svg";
const snow = "/assets/Snow-424582cb.svg";
const BaseImageBg = {
  type: "image",
  id: "i-custom",
  label: message("Custom image")
};
const ImageBackgrounds = [
  {
    ...BaseImageBg,
    id: "img0",
    backgroundColor: "#ee5522",
    backgroundImage: `url(${protrudingSquares})`,
    backgroundRepeat: "repeat",
    label: message("Protruding squares"),
    color: "#fff"
  },
  {
    ...BaseImageBg,
    id: "img1",
    backgroundColor: "#00bbff",
    backgroundImage: `url(${launchDay})`,
    label: message("Launch day"),
    backgroundSize: "contain",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    color: "#fff"
  },
  {
    ...BaseImageBg,
    id: "img2",
    backgroundColor: "#fff",
    backgroundImage: `url(${alternatingTriangles})`,
    label: message("Alternating triangles"),
    color: "#000"
  },
  {
    ...BaseImageBg,
    id: "img3",
    backgroundColor: "#002200",
    backgroundImage: `url(${monsteraPatch})`,
    label: message("Monstera patch"),
    color: "#fff"
  },
  {
    ...BaseImageBg,
    id: "img4",
    backgroundColor: "#aa3333",
    backgroundImage: `url(${confettiDoodles})`,
    label: message("Confetti doodles"),
    color: "#fff",
    backgroundRepeat: "repeat",
    backgroundPosition: "center center",
    backgroundSize: "contain"
  },
  {
    ...BaseImageBg,
    id: "img5",
    backgroundColor: "#070014",
    backgroundImage: `url(${hurricaneAperture})`,
    label: message("Hurricane aperture"),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    color: "#fff"
  },
  {
    ...BaseImageBg,
    id: "img6",
    backgroundColor: "#11ddaa",
    backgroundImage: `url(${looneyLoops})`,
    label: message("Looney loops"),
    backgroundPosition: "center center",
    backgroundSize: "cover",
    color: "#000"
  },
  {
    ...BaseImageBg,
    id: "img7",
    backgroundColor: "#ccffff",
    backgroundImage: `url(${icyExplosion})`,
    label: message("Icy explosion"),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    color: "#000"
  },
  {
    ...BaseImageBg,
    id: "img8",
    backgroundColor: "#442233",
    backgroundImage: `url(${nuclearFocalPoint})`,
    label: message("Nuclear point"),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    color: "#fff"
  },
  {
    ...BaseImageBg,
    id: "img9",
    backgroundColor: "#ffdd55",
    backgroundImage: `url(${angledFocus})`,
    label: message("Angled focus"),
    backgroundPosition: "center center",
    backgroundSize: "cover",
    color: "#fff"
  },
  {
    ...BaseImageBg,
    id: "img10",
    backgroundColor: "#220044",
    backgroundImage: `url(${circularFocus})`,
    label: message("Circular focus"),
    backgroundPosition: "center center",
    backgroundSize: "cover",
    color: "#fff"
  },
  {
    ...BaseImageBg,
    id: "img11",
    backgroundColor: "#000000",
    backgroundImage: `url(${farseeingEyeball})`,
    label: message("Farseeing eyeball"),
    backgroundPosition: "center center",
    backgroundSize: "cover",
    color: "#fff"
  },
  {
    ...BaseImageBg,
    id: "img12",
    backgroundColor: "#ff0000",
    backgroundImage: `url(${canyonFunnel})`,
    label: message("Canyon funnel"),
    backgroundPosition: "center center",
    backgroundSize: "cover",
    color: "#fff"
  },
  {
    ...BaseImageBg,
    id: "img13",
    backgroundColor: "#ffdd99",
    backgroundImage: `url(${threadsAhead})`,
    label: message("Threads ahead"),
    color: "#000",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto"
  },
  {
    ...BaseImageBg,
    id: "img14",
    backgroundImage: `url(${sprinkle})`,
    label: message("Sprinkle"),
    backgroundRepeat: "repeat",
    backgroundPosition: "center center"
  },
  {
    ...BaseImageBg,
    id: "img15",
    backgroundImage: `url(${circuitBoard})`,
    label: message("Circuit board"),
    backgroundRepeat: "repeat",
    backgroundPosition: "center center"
  },
  {
    ...BaseImageBg,
    id: "img16",
    backgroundImage: `url(${snow})`,
    label: message("Snow"),
    backgroundRepeat: "repeat",
    backgroundPosition: "center center"
  }
];
const BackgroundPositions = {
  cover: {
    label: message("Stretch to fit"),
    bgConfig: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }
  },
  contain: {
    label: message("Fit image"),
    bgConfig: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center top"
    }
  },
  repeat: {
    label: message("Repeat image"),
    bgConfig: {
      backgroundRepeat: "repeat",
      backgroundSize: void 0,
      backgroundPosition: "left top"
    }
  }
};
function SimpleBackgroundPositionSelector({
  value: imageBgValue,
  onChange
}) {
  const selectedPosition = positionKeyFromValue(imageBgValue);
  return /* @__PURE__ */ jsx("div", { className: "mt-20 border-t pt-14", children: /* @__PURE__ */ jsx(RadioGroup, { size: "sm", disabled: !imageBgValue, children: Object.entries(BackgroundPositions).map(([key, position2]) => /* @__PURE__ */ jsx(
    Radio,
    {
      name: "background-position",
      value: key,
      checked: key === selectedPosition,
      onChange: (e) => {
        if (imageBgValue) {
          onChange == null ? void 0 : onChange({
            ...imageBgValue,
            ...position2.bgConfig
          });
        }
      },
      children: /* @__PURE__ */ jsx(Trans, { ...position2.label })
    },
    key
  )) }) });
}
function positionKeyFromValue(value) {
  if ((value == null ? void 0 : value.backgroundSize) === "cover") {
    return "cover";
  } else if ((value == null ? void 0 : value.backgroundSize) === "contain") {
    return "contain";
  } else {
    return "repeat";
  }
}
const SegmentedRadio = forwardRef(
  (props, ref) => {
    const {
      children,
      autoFocus,
      size: size2,
      invalid,
      isFirst,
      labelRef,
      isSelected,
      ...domProps
    } = props;
    const inputRef = useObjectRef(ref);
    useAutoFocus({ autoFocus }, inputRef);
    const sizeClassNames = getSizeClassNames(size2);
    return /* @__PURE__ */ jsxs(
      "label",
      {
        ref: labelRef,
        className: clsx(
          "relative z-20 inline-flex flex-auto cursor-pointer select-none items-center justify-center gap-8 whitespace-nowrap align-middle font-medium transition-colors hover:text-main",
          isSelected ? "text-main" : "text-muted",
          !isFirst && "",
          sizeClassNames,
          props.disabled && "pointer-events-none text-disabled",
          props.invalid && "text-danger"
        ),
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              className: "pointer-events-none absolute left-0 top-0 h-full w-full appearance-none rounded focus-visible:outline",
              ref: inputRef,
              ...domProps
            }
          ),
          children && /* @__PURE__ */ jsx("span", { children })
        ]
      }
    );
  }
);
function getSizeClassNames(size2) {
  switch (size2) {
    case "xs":
      return "px-6 py-3 text-xs";
    case "sm":
      return "px-10 py-5 text-sm";
    case "lg":
      return "px-16 py-6 text-lg";
    default:
      return "px-16 py-8 text-sm";
  }
}
function ActiveIndicator({
  selectedValue,
  labelsRef
}) {
  const [style, setStyle] = useState(null);
  useEffect(() => {
    if (selectedValue != null && labelsRef.current) {
      const el = labelsRef.current[selectedValue];
      if (!el)
        return;
      setStyle({
        width: el.offsetWidth,
        height: el.offsetHeight,
        left: el.offsetLeft
      });
    }
  }, [setStyle, selectedValue, labelsRef]);
  if (!style) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    m.div,
    {
      animate: style,
      initial: false,
      className: "bg-paper shadow rounded absolute z-10 pointer-events-none"
    }
  );
}
const SegmentedRadioGroup = forwardRef((props, ref) => {
  const { children, size: size2, className } = props;
  const id = useId();
  const name = props.name || id;
  const labelsRef = useRef({});
  const [selectedValue, setSelectedValue] = useControlledState(
    props.value,
    props.defaultValue,
    props.onChange
  );
  return /* @__PURE__ */ jsx("fieldset", { ref, className: clsx(className, props.width ?? "w-min"), children: /* @__PURE__ */ jsxs("div", { className: "relative isolate flex rounded bg-chip p-4", children: [
    /* @__PURE__ */ jsx(ActiveIndicator, { selectedValue, labelsRef }),
    Children.map(children, (child, index) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          isFirst: index === 0,
          name,
          size: size2,
          onChange: (e) => {
            var _a2, _b2;
            setSelectedValue(e.target.value);
            (_b2 = (_a2 = child.props).onChange) == null ? void 0 : _b2.call(_a2, e);
          },
          labelRef: (el) => {
            if (el) {
              labelsRef.current[child.props.value] = el;
            }
          },
          isSelected: selectedValue === child.props.value
        });
      }
    })
  ] }) });
});
const repeat = [
  {
    value: "no-repeat",
    label: message("Don't repeat")
  },
  {
    value: "repeat-x",
    label: message("Horizontal")
  },
  {
    value: "repeat-y",
    label: message("Vertical")
  },
  {
    value: "repeat",
    label: message("Both")
  }
];
const size = [
  {
    value: "auto",
    label: message("Auto")
  },
  {
    value: "cover",
    label: message("Stretch to fit")
  },
  {
    value: "contain",
    label: message("Fit image")
  }
];
const position = [
  "left top",
  "center top",
  "right top",
  "left center",
  "center center",
  "right center",
  "left bottom",
  "center bottom",
  "right bottom"
];
function AdvancedBackgroundPositionSelector({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mt-14 border-t pt-14", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-60", children: [
      /* @__PURE__ */ jsx(RepeatSelector, { value, onChange }),
      /* @__PURE__ */ jsx(SizeSelector, { value, onChange }),
      /* @__PURE__ */ jsx(PositionSelector, { value, onChange })
    ] }),
    /* @__PURE__ */ jsxs(
      SegmentedRadioGroup,
      {
        size: "xs",
        className: "mt-20",
        value: (value == null ? void 0 : value.backgroundAttachment) ?? "scroll",
        onChange: (newValue) => {
          onChange == null ? void 0 : onChange({
            ...value,
            backgroundAttachment: newValue
          });
        },
        children: [
          /* @__PURE__ */ jsx(SegmentedRadio, { value: "fixed", children: /* @__PURE__ */ jsx(Trans, { message: "Fixed" }) }),
          /* @__PURE__ */ jsx(SegmentedRadio, { value: "scroll", children: /* @__PURE__ */ jsx(Trans, { message: "Not fixed" }) })
        ]
      }
    )
  ] });
}
function RepeatSelector({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsx(Trans, { message: "Repeat" }) }),
    /* @__PURE__ */ jsx(RadioGroup, { orientation: "vertical", size: "sm", disabled: !value, children: repeat.map(({ value: repeatValue, label }) => /* @__PURE__ */ jsx(
      Radio,
      {
        value: repeatValue,
        checked: (value == null ? void 0 : value.backgroundRepeat) === repeatValue,
        onChange: () => {
          onChange == null ? void 0 : onChange({
            ...value,
            backgroundRepeat: repeatValue
          });
        },
        children: /* @__PURE__ */ jsx(Trans, { ...label })
      },
      repeatValue
    )) })
  ] });
}
function SizeSelector({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsx(Trans, { message: "Size" }) }),
    /* @__PURE__ */ jsx(RadioGroup, { orientation: "vertical", size: "sm", disabled: !value, children: size.map(({ value: sizeValue, label }) => /* @__PURE__ */ jsx(
      Radio,
      {
        value: sizeValue,
        checked: (value == null ? void 0 : value.backgroundSize) === sizeValue,
        onChange: () => {
          onChange == null ? void 0 : onChange({
            ...value,
            backgroundSize: sizeValue
          });
        },
        children: /* @__PURE__ */ jsx(Trans, { ...label })
      },
      sizeValue
    )) })
  ] });
}
function PositionSelector({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsx(Trans, { message: "Position" }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-8", children: position.map((position2) => /* @__PURE__ */ jsx(
      PositionSelectorButton,
      {
        disabled: !value,
        value,
        onChange,
        position: position2
      },
      position2
    )) })
  ] });
}
function PositionSelectorButton({
  value,
  onChange,
  position: position2,
  disabled
}) {
  return /* @__PURE__ */ jsx(
    ButtonBase,
    {
      disabled,
      onClick: () => {
        onChange({
          ...value,
          backgroundPosition: position2
        });
      },
      className: clsx(
        "h-26 w-26 rounded border",
        (value == null ? void 0 : value.backgroundPosition) === position2 ? "bg-primary" : "bg-alt"
      )
    }
  );
}
function urlFromBackgroundImage(backgroundImage) {
  if (backgroundImage) {
    const match = backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
    return match == null ? void 0 : match[1];
  }
}
function ImageBackgroundTab({
  value,
  onChange,
  className,
  positionSelector,
  diskPrefix,
  isInsideDialog
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className, children: [
      /* @__PURE__ */ jsx(
        CustomImageTrigger,
        {
          value,
          onChange,
          diskPrefix,
          hideFooter: isInsideDialog
        }
      ),
      ImageBackgrounds.map((background) => /* @__PURE__ */ jsx(
        BackgroundSelectorButton,
        {
          onClick: () => onChange == null ? void 0 : onChange({
            ...BaseImageBg,
            ...background
          }),
          isActive: (value == null ? void 0 : value.id) === background.id,
          style: {
            ...cssPropsFromBgConfig(background),
            backgroundAttachment: "initial"
          },
          label: /* @__PURE__ */ jsx(Trans, { ...background.label })
        },
        background.id
      ))
    ] }),
    positionSelector === "advanced" ? /* @__PURE__ */ jsx(AdvancedBackgroundPositionSelector, { value, onChange }) : /* @__PURE__ */ jsx(SimpleBackgroundPositionSelector, { value, onChange })
  ] });
}
function CustomImageTrigger({
  value,
  onChange,
  diskPrefix,
  hideFooter
}) {
  value = (value == null ? void 0 : value.id) === BaseImageBg.id ? value : void 0;
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "popover",
      onClose: (imageUrl) => {
        onChange == null ? void 0 : onChange(
          imageUrl ? {
            ...BaseImageBg,
            backgroundImage: `url(${imageUrl})`
          } : null
        );
      },
      children: [
        /* @__PURE__ */ jsx(
          BackgroundSelectorButton,
          {
            label: /* @__PURE__ */ jsx(Trans, { ...BaseImageBg.label }),
            isActive: (value == null ? void 0 : value.id) === BaseImageBg.id && (value == null ? void 0 : value.backgroundImage) !== "none",
            className: "border-2 border-dashed",
            style: cssPropsFromBgConfig(value),
            children: /* @__PURE__ */ jsx("span", { className: "inline-block rounded bg-black/20 p-10 text-white", children: /* @__PURE__ */ jsx(UploadIcon, { size: "lg" }) })
          }
        ),
        /* @__PURE__ */ jsx(
          CustomImageDialog,
          {
            value,
            diskPrefix,
            hideFooter
          }
        )
      ]
    }
  );
}
function CustomImageDialog({
  value,
  diskPrefix,
  hideFooter
}) {
  const defaultValue = !(value == null ? void 0 : value.backgroundImage) || !value.backgroundImage.includes("url(") ? void 0 : urlFromBackgroundImage(value.backgroundImage);
  const form = useForm({
    defaultValues: { imageUrl: defaultValue }
  });
  const { close, formId } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { size: "sm", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Upload image" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        id: formId,
        form,
        onSubmit: (values) => close(values.imageUrl),
        children: /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
          FormImageSelector,
          {
            autoFocus: true,
            name: "imageUrl",
            diskPrefix: diskPrefix || "biolinks",
            showRemoveButton: true,
            onChange: hideFooter ? (imageUrl) => close(imageUrl) : void 0
          }
        ) })
      }
    ) }),
    !hideFooter && /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", type: "submit", form: formId, children: /* @__PURE__ */ jsx(Trans, { message: "Select" }) })
    ] })
  ] });
}
const TabMap = {
  color: ColorBackgroundTab,
  gradient: GradientBackgroundTab,
  image: ImageBackgroundTab
};
function BackgroundSelector({
  className,
  value,
  onChange,
  tabColWidth,
  isInsideDialog,
  positionSelector = "simple",
  diskPrefix
}) {
  const [activeTab, setActiveTab] = useState(() => {
    if ((value == null ? void 0 : value.type) === "image")
      return "image";
    if ((value == null ? void 0 : value.type) === "gradient")
      return "gradient";
    return "color";
  });
  const Tab2 = TabMap[activeTab];
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx(TypeSelector, { activeTab, onTabChange: setActiveTab }),
    /* @__PURE__ */ jsx(
      Tab2,
      {
        value,
        onChange,
        isInsideDialog,
        positionSelector,
        diskPrefix,
        className: clsx(
          "grid items-start gap-14",
          tabColWidth || "grid-cols-[repeat(auto-fill,minmax(90px,1fr))]"
        )
      }
    )
  ] });
}
function TypeSelector({ activeTab, onTabChange }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-20 flex items-center gap-20 border-b pb-20", children: [
    /* @__PURE__ */ jsx(
      TypeButton,
      {
        isActive: activeTab === "color",
        icon: /* @__PURE__ */ jsx(FormatColorFillIcon, {}),
        title: /* @__PURE__ */ jsx(Trans, { message: "Flat color" }),
        onClick: () => onTabChange("color")
      }
    ),
    /* @__PURE__ */ jsx(
      TypeButton,
      {
        isActive: activeTab === "gradient",
        icon: /* @__PURE__ */ jsx(GradientIcon, {}),
        title: /* @__PURE__ */ jsx(Trans, { message: "Gradient" }),
        onClick: () => onTabChange("gradient")
      }
    ),
    /* @__PURE__ */ jsx(
      TypeButton,
      {
        isActive: activeTab === "image",
        icon: /* @__PURE__ */ jsx(ImageIcon, {}),
        title: /* @__PURE__ */ jsx(Trans, { message: "Image" }),
        onClick: () => onTabChange("image")
      }
    )
  ] });
}
function TypeButton({ isActive, icon, title, onClick }) {
  return /* @__PURE__ */ jsxs("div", { role: "button", className: "block", onClick, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx(
          "mx-auto mb-8 flex h-50 w-50 items-center justify-center rounded-panel border text-muted",
          isActive && "border-primary ring"
        ),
        children: icon
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "text-center text-sm text-primary", children: title })
  ] });
}
function BiolinkBackgroundSelector({
  className
}) {
  const value = useBiolinkEditorStore((s) => {
    var _a2;
    return (_a2 = s.appearance) == null ? void 0 : _a2.bgConfig;
  });
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx("h2", { className: appearanceHeaderClassnames.h2, children: /* @__PURE__ */ jsx(Trans, { message: "Background" }) }),
    /* @__PURE__ */ jsx(
      BackgroundSelector,
      {
        value,
        onChange: (newValue) => biolinkEditorState().updateAppearance({ bgConfig: newValue })
      }
    )
  ] });
}
const AvailableVariants = {
  flat: message("Fill"),
  outline: message("Outline")
};
const AvailableRadius = {
  "rounded-none": message("Square"),
  rounded: message("Rounded"),
  "rounded-full": message("Pill")
};
function ButtonStyleSelector({ className }) {
  const value = useBiolinkEditorStore((s) => {
    var _a2;
    return (_a2 = s.appearance) == null ? void 0 : _a2.btnConfig;
  });
  const setValue = useCallback(
    (newValue) => {
      biolinkEditorState().updateAppearance({
        btnConfig: {
          ...value,
          ...newValue
        }
      });
    },
    [value]
  );
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx("h2", { className: appearanceHeaderClassnames.h2, children: /* @__PURE__ */ jsx(Trans, { message: "Buttons" }) }),
    /* @__PURE__ */ jsx(StyleSelector, { value, onChange: setValue }),
    /* @__PURE__ */ jsx(ShadowSelector, { value, onChange: setValue })
  ] });
}
function StyleSelector({ value, onChange }) {
  const selectedVariant = (value == null ? void 0 : value.variant) ?? "flat";
  const selectedRadius = (value == null ? void 0 : value.radius) ?? "rounded";
  return /* @__PURE__ */ jsx("div", { children: Object.entries(AvailableVariants).map(([variant, variantLabel]) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h3", { className: appearanceHeaderClassnames.h3, children: /* @__PURE__ */ jsx(Trans, { ...variantLabel }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-24 md:grid-cols-3", children: Object.entries(AvailableRadius).map(([radius, radiusLabel]) => /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx(
          "rounded",
          variant === selectedVariant && selectedRadius === radius && "ring ring-primary-light ring-offset-4"
        ),
        children: /* @__PURE__ */ jsx(
          Button,
          {
            variant,
            color: "primary",
            radius,
            className: "w-full",
            onClick: () => {
              onChange({
                variant,
                radius
              });
            },
            children: /* @__PURE__ */ jsx(Trans, { ...radiusLabel })
          }
        )
      },
      radius
    )) })
  ] }, variant)) });
}
const AvailableShadows = {
  "shadow-none": message("No shadow"),
  "rgb(0 0 0 / 20%) 0.2rem 0.2rem 0.4rem 0px": message("Light shadow"),
  "rgb(0 0 0 / 75%) 0.3rem 0.4rem 0px": message("Hard shadow")
};
function ShadowSelector({ value, onChange }) {
  const selectedShadow = (value == null ? void 0 : value.shadow) ?? "shadow-none";
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h3", { className: "my-12 font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "Shadow" }) }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-24", children: Object.entries(AvailableShadows).map(([shadow, shadowLabel]) => /* @__PURE__ */ jsx(
      "div",
      {
        style: { boxShadow: shadow },
        className: "h-40 w-70 overflow-hidden rounded-button",
        children: /* @__PURE__ */ jsx(
          ButtonBase,
          {
            display: "block",
            radius: "rounded-button",
            className: clsx(
              "h-full w-full border",
              selectedShadow === shadow && "border-primary"
            ),
            onClick: () => {
              onChange({
                shadow: shadow === "shadow-none" ? void 0 : shadow
              });
            },
            children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: /* @__PURE__ */ jsx(Trans, { ...shadowLabel }) })
          }
        )
      },
      shadow
    )) })
  ] });
}
const fontImage = "/assets/font-a5a81d1a.svg";
function FontSelectorFilters({
  state: { filters, setFilters }
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs("div", { className: "mb-24 items-center gap-24 @xs:flex", children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        className: "mb-12 flex-auto @xs:mb-0",
        value: filters.query,
        onChange: (e) => {
          setFilters({
            ...filters,
            query: e.target.value
          });
        },
        startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
        placeholder: trans(message("Search fonts"))
      }
    ),
    /* @__PURE__ */ jsxs(
      SelectForwardRef,
      {
        className: "flex-auto",
        selectionMode: "single",
        selectedValue: filters.category,
        onSelectionChange: (value) => {
          setFilters({
            ...filters,
            category: value
          });
        },
        children: [
          /* @__PURE__ */ jsx(Item, { value: "", children: /* @__PURE__ */ jsx(Trans, { message: "All categories" }) }),
          /* @__PURE__ */ jsx(Item, { value: "serif", children: /* @__PURE__ */ jsx(Trans, { message: "Serif" }) }),
          /* @__PURE__ */ jsx(Item, { value: "sans-serif", children: /* @__PURE__ */ jsx(Trans, { message: "Sans serif" }) }),
          /* @__PURE__ */ jsx(Item, { value: "display", children: /* @__PURE__ */ jsx(Trans, { message: "Display" }) }),
          /* @__PURE__ */ jsx(Item, { value: "handwriting", children: /* @__PURE__ */ jsx(Trans, { message: "Handwriting" }) }),
          /* @__PURE__ */ jsx(Item, { value: "monospace", children: /* @__PURE__ */ jsx(Trans, { message: "Monospace" }) })
        ]
      }
    )
  ] });
}
function useFilter(options) {
  const collator = useCollator({
    usage: "search",
    ...options
  });
  return {
    startsWith(string, substring) {
      if (substring.length === 0) {
        return true;
      }
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      return collator.compare(string.slice(0, substring.length), substring) === 0;
    },
    endsWith(string, substring) {
      if (substring.length === 0) {
        return true;
      }
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      return collator.compare(string.slice(-substring.length), substring) === 0;
    },
    contains(string, substring) {
      if (substring.length === 0) {
        return true;
      }
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      let scan = 0;
      const sliceLen = substring.length;
      for (; scan + sliceLen <= string.length; scan++) {
        const slice = string.slice(scan, scan + sliceLen);
        if (collator.compare(substring, slice) === 0) {
          return true;
        }
      }
      return false;
    }
  };
}
const BrowserSafeFonts = [
  {
    label: message("System"),
    family: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    category: "sans-serif"
  },
  { family: "Impact, Charcoal, sans-serif", category: "sans-serif" },
  { family: "Arial, Helvetica Neue, Helvetica, sans-serif", category: "serif" },
  { family: '"Comic Sans MS", cursive, sans-serif', category: "Handwriting" },
  { family: "Century Gothic, sans-serif", category: "sans-serif" },
  { family: '"Courier New", Courier, monospace', category: "monospace" },
  {
    family: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
    category: "sans-serif"
  },
  { family: '"Times New Roman", Times, serif', category: "serif" },
  { family: '"Lucida Console", Monaco, monospace', category: "monospace" },
  { family: '"Andele Mono", monospace, sans-serif', category: "sans-serif" },
  { family: "Verdana, Geneva, sans-serif", category: "sans-serif" },
  {
    family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    category: "sans-serif"
  }
];
function useFontSelectorState({
  value,
  onChange
}) {
  const { data, isLoading } = useValueLists(["googleFonts"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilterState] = useState({
    query: "",
    category: (value == null ? void 0 : value.category) ?? ""
  });
  const { contains } = useFilter({
    sensitivity: "base"
  });
  const setFilters = useCallback((filters2) => {
    setFilterState(filters2);
    setCurrentPage(0);
  }, []);
  const allFonts = useMemo(() => {
    return BrowserSafeFonts.concat((data == null ? void 0 : data.googleFonts) ?? []);
  }, [data == null ? void 0 : data.googleFonts]);
  const filteredFonts = useMemo(() => {
    return allFonts.filter((font) => {
      var _a2;
      return contains(font.family, filters.query) && (!filters.category || ((_a2 = font.category) == null ? void 0 : _a2.toLowerCase()) === filters.category.toLowerCase());
    });
  }, [allFonts, filters, contains]);
  const pages = useMemo(() => {
    return chunkArray(filteredFonts, 20);
  }, [filteredFonts]);
  const fonts = pages[currentPage];
  useEffect(() => {
    const id = "font-selector";
    if (fonts == null ? void 0 : fonts.length) {
      loadFonts(fonts, { id });
    }
  }, [fonts, currentPage]);
  return {
    fonts: fonts || [],
    currentPage,
    filteredFonts: filteredFonts || [],
    setCurrentPage,
    isLoading,
    filters,
    setFilters,
    value,
    onChange,
    pages
  };
}
function FontSelectorPagination({
  state: { currentPage = 0, setCurrentPage, filteredFonts, pages }
}) {
  const total = (filteredFonts == null ? void 0 : filteredFonts.length) || 0;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-24 text-sm mt-30 pt-14 border-t", children: [
    total > 0 && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: ":from - :to of :total",
        values: {
          from: currentPage * 20 + 1,
          to: Math.min((currentPage + 1) * 20, total),
          total
        }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          disabled: currentPage < 1,
          onClick: () => {
            setCurrentPage(Math.max(0, currentPage - 1));
          },
          children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        IconButton,
        {
          disabled: currentPage >= pages.length - 1,
          onClick: () => {
            setCurrentPage(currentPage + 1);
          },
          children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
        }
      )
    ] })
  ] });
}
function FontSelector$1(props) {
  const state = useFontSelectorState(props);
  return /* @__PURE__ */ jsxs("div", { className: props.className, children: [
    /* @__PURE__ */ jsx(FontSelectorFilters, { state }),
    /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: /* @__PURE__ */ jsx(FontList, { state }) }),
    /* @__PURE__ */ jsx(FontSelectorPagination, { state })
  ] });
}
function FontList({ state }) {
  const { isLoading, fonts } = state;
  const gridClassName = "grid gap-24 grid-cols-[repeat(auto-fill,minmax(90px,1fr))] items-start";
  if (isLoading) {
    return /* @__PURE__ */ jsx(FontListSkeleton, { className: gridClassName });
  }
  if (!(fonts == null ? void 0 : fonts.length)) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-60",
        size: "sm",
        image: /* @__PURE__ */ jsx(SvgImage, { src: fontImage }),
        title: /* @__PURE__ */ jsx(Trans, { message: "No matching fonts" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Try another search query or different category" })
      }
    );
  }
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, className: gridClassName, children: fonts == null ? void 0 : fonts.map((font) => /* @__PURE__ */ jsx(FontButton, { font, state }, font.family)) }, "font-list");
}
function FontButton({ font, state: { value, onChange } }) {
  const isActive = (value == null ? void 0 : value.family) === font.family;
  const displayName = font.family.split(",")[0].replace(/"/g, "");
  return /* @__PURE__ */ jsxs(
    ButtonBase,
    {
      display: "block",
      onClick: () => {
        onChange(font);
      },
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "flex aspect-square items-center justify-center rounded-panel border text-4xl transition-bg-color hover:bg-hover md:text-5xl",
              isActive && "ring-2 ring-primary ring-offset-2"
            ),
            children: /* @__PURE__ */ jsx("span", { style: { fontFamily: font.family }, children: "Aa" })
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "mt-6 block overflow-hidden overflow-ellipsis whitespace-nowrap text-sm",
              isActive && "text-primary"
            ),
            children: font.label ? /* @__PURE__ */ jsx(Trans, { ...font.label }) : displayName
          }
        )
      ]
    },
    font.family
  );
}
function FontListSkeleton({ className }) {
  const items = Array.from(Array(20).keys());
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, className, children: items.map((index) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "aspect-square", children: /* @__PURE__ */ jsx(Skeleton, { display: "block", variant: "rect" }) }),
    /* @__PURE__ */ jsx(Skeleton, { className: "mt-6 text-sm" })
  ] }, index)) }, "font-list-skeleton");
}
function useSaveBiolinkAppearance() {
  const biolinkId = useEditorBiolinkId();
  return useMutation({
    mutationFn: () => {
      const appearance = biolinkEditorState().appearance;
      return saveAppearance(biolinkId, { config: appearance });
    },
    onSuccess: () => {
      biolinkEditorState().setAppearanceIsDirty(false);
      toast.positive(message("Appearance saved"));
    },
    onError: (err) => showHttpErrorToast(err, message("Could not save appearance"))
  });
}
function saveAppearance(biolinkId, appearance) {
  return apiClient.post(`biolink/${biolinkId}/appearance`, appearance).then((r) => r.data);
}
function ColorInput({ value, onChange, label }) {
  const style = getInputFieldClassNames({
    size: "md",
    startAppend: /* @__PURE__ */ jsx(Fragment, {})
  });
  const id = useId();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: style.label, htmlFor: id, children: label }),
    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsxs(
        DialogTrigger,
        {
          type: "popover",
          value,
          onValueChange: onChange,
          onClose: onChange,
          children: [
            /* @__PURE__ */ jsx(
              ButtonBase,
              {
                className: "h-42 w-42 flex-shrink-0 rounded-input border bg-black",
                style: { backgroundColor: value }
              }
            ),
            /* @__PURE__ */ jsx(ColorPickerDialog, { showInput: false })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        HexColorInput,
        {
          id,
          autoComplete: "off",
          role: "textbox",
          autoCorrect: "off",
          spellCheck: "false",
          required: true,
          prefixed: true,
          className: style.input,
          color: value,
          onChange
        }
      )
    ] })
  ] });
}
function BiolinkAppearanceEditor() {
  const saveAppearance2 = useSaveBiolinkAppearance();
  const isDirty = useBiolinkEditorStore((s) => s.appearanceIsDirty);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "mb-40", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-4 text-2xl", children: /* @__PURE__ */ jsx(Trans, { message: "Custom appearance" }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-20 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Fully customize your Biolink. Change background color or select gradients and images. Choose button style, text color, typeface and more." }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          onClick: () => saveAppearance2.mutate(),
          disabled: !isDirty || saveAppearance2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save changes" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(BiolinkBackgroundSelector, {}),
    /* @__PURE__ */ jsx(ColorSelector, {}),
    /* @__PURE__ */ jsx(ButtonStyleSelector, { className: "my-60" }),
    /* @__PURE__ */ jsx(FontSelector, {}),
    /* @__PURE__ */ jsx(BrandingSelector, {})
  ] });
}
function ColorSelector() {
  const btnConfig = useBiolinkEditorStore((s) => {
    var _a2;
    return (_a2 = s.appearance) == null ? void 0 : _a2.btnConfig;
  });
  const bgConfig = useBiolinkEditorStore((s) => {
    var _a2;
    return (_a2 = s.appearance) == null ? void 0 : _a2.bgConfig;
  });
  return /* @__PURE__ */ jsxs("div", { className: "my-60", children: [
    /* @__PURE__ */ jsx("h2", { className: appearanceHeaderClassnames.h2, children: /* @__PURE__ */ jsx(Trans, { message: "Colors" }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid-cols-3 items-center gap-24 md:grid", children: [
      /* @__PURE__ */ jsx(
        ColorInput,
        {
          label: /* @__PURE__ */ jsx(Trans, { message: "Text color" }),
          value: (bgConfig == null ? void 0 : bgConfig.color) || "#000",
          onChange: (newValue) => {
            biolinkEditorState().updateAppearance({
              bgConfig: {
                ...bgConfig,
                color: newValue
              }
            });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        ColorInput,
        {
          label: /* @__PURE__ */ jsx(Trans, { message: "Button color" }),
          value: (btnConfig == null ? void 0 : btnConfig.color) || "#000",
          onChange: (newValue) => {
            biolinkEditorState().updateAppearance({
              btnConfig: {
                ...btnConfig,
                color: newValue
              }
            });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        ColorInput,
        {
          label: /* @__PURE__ */ jsx(Trans, { message: "Button text color" }),
          value: (btnConfig == null ? void 0 : btnConfig.textColor) || "#000",
          onChange: (newValue) => {
            biolinkEditorState().updateAppearance({
              btnConfig: {
                ...btnConfig,
                textColor: newValue
              }
            });
          }
        }
      )
    ] })
  ] });
}
function FontSelector() {
  const currentValue = useBiolinkEditorStore((s) => {
    var _a2;
    return (_a2 = s.appearance) == null ? void 0 : _a2.fontConfig;
  }) || BrowserSafeFonts[0];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: appearanceHeaderClassnames.h2, children: /* @__PURE__ */ jsx(Trans, { message: "Font" }) }),
    /* @__PURE__ */ jsx(
      FontSelector$1,
      {
        value: currentValue,
        onChange: (newValue) => {
          biolinkEditorState().updateAppearance({
            fontConfig: {
              ...currentValue,
              ...newValue
            }
          });
        }
      }
    )
  ] });
}
function BrandingSelector() {
  const { branding, biolink } = useSettings();
  const { isSubscribed } = useAuth();
  const { billing } = useSettings();
  const currentValue = useBiolinkEditorStore((s) => {
    var _a2;
    return (_a2 = s.appearance) == null ? void 0 : _a2.hideBranding;
  }) || false;
  return /* @__PURE__ */ jsxs("div", { className: "my-60", children: [
    /* @__PURE__ */ jsx("h2", { className: appearanceHeaderClassnames.h2, children: /* @__PURE__ */ jsx(Trans, { message: "Branding" }) }),
    billing.enable && /* @__PURE__ */ jsx("div", { className: "mb-14", children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          size: "2xs",
          startIcon: /* @__PURE__ */ jsx(LockIcon, {}),
          children: /* @__PURE__ */ jsx(Trans, { message: "Upgrade" })
        }
      ),
      /* @__PURE__ */ jsx(
        FeatureLockedDialog,
        {
          message: /* @__PURE__ */ jsx(
            Trans,
            {
              message: "Upgrade to remove :site logo.",
              values: { site: branding.site_name }
            }
          ),
          messageSuffix: null
        }
      )
    ] }) }),
    biolink.show_branding && /* @__PURE__ */ jsx(
      Switch,
      {
        disabled: !isSubscribed,
        checked: currentValue,
        onChange: (e) => {
          biolinkEditorState().updateAppearance({
            hideBranding: e.target.checked
          });
        },
        children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Hide :site logo",
            values: { site: branding.site_name }
          }
        )
      }
    )
  ] });
}
const TabsMap = {
  content: 0,
  appearance: 1,
  settings: 2
};
function BiolinkEditorPage() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(BiolinkEditorHeader, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-60 p-24 container mx-auto", children: [
      /* @__PURE__ */ jsx(BiolinkEditor, {}),
      /* @__PURE__ */ jsx(LivePreview, {})
    ] })
  ] });
}
function BiolinkEditorHeader() {
  const { biolink } = useEditorBiolink();
  return /* @__PURE__ */ jsxs("header", { className: "border-b px-10 py-4 flex items-center gap-10 min-h-46", children: [
    /* @__PURE__ */ jsx(LinkIcon, { className: "text-muted" }),
    /* @__PURE__ */ jsxs(AnimatePresence, { children: [
      biolink && /* @__PURE__ */ jsx(
        m.a,
        {
          className: LinkStyle,
          href: biolink == null ? void 0 : biolink.short_url,
          target: "_blank",
          rel: "noreferrer",
          ...opacityAnimation,
          children: removeProtocol(biolink.short_url)
        },
        "link"
      ),
      biolink && /* @__PURE__ */ createElement(m.div, { ...opacityAnimation, key: "share-button", className: "ml-auto" }, /* @__PURE__ */ jsx(ShareLinkButton, { variant: "text", link: biolink }))
    ] })
  ] });
}
function BiolinkEditor() {
  const { biolinkId } = useParams();
  const { tabName = "content" } = useParams();
  const selectedTab = TabsMap[tabName] ?? TabsMap.content;
  useEditorBiolink();
  useEffect(() => {
    prefetchLinkFormValueLists();
  }, [biolinkId]);
  return /* @__PURE__ */ jsx("div", { className: "flex-auto min-w-0", children: /* @__PURE__ */ jsxs(Tabs, { overflow: "overflow-visible", selectedTab, isLazy: true, children: [
    /* @__PURE__ */ jsxs(TabList, { className: "sticky top-0 bg dark:bg-alt z-10", children: [
      /* @__PURE__ */ jsx(
        Tab,
        {
          padding: "w-140",
          elementType: Link,
          to: "../content",
          relative: "path",
          children: /* @__PURE__ */ jsx(Trans, { message: "Content" })
        }
      ),
      /* @__PURE__ */ jsx(
        Tab,
        {
          padding: "w-140",
          elementType: Link,
          to: "../appearance",
          relative: "path",
          children: /* @__PURE__ */ jsx(Trans, { message: "Appearance" })
        }
      ),
      /* @__PURE__ */ jsx(
        Tab,
        {
          padding: "w-140",
          elementType: Link,
          to: "../settings",
          relative: "path",
          children: /* @__PURE__ */ jsx(Trans, { message: "Settings" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(TabPanels, { className: "py-20", children: [
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(BiolinkContent, {}) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(BiolinkAppearanceEditor, {}) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(BiolinkSettingsForm, {}) })
    ] })
  ] }) });
}
function BiolinkContent() {
  const { isLoading, status, biolink } = useEditorBiolink();
  const [activeWidgetDialog, setActiveWidgetDialog] = useState(null);
  let renderedContent;
  if (status === "success" && !(biolink == null ? void 0 : biolink.content.length)) {
    renderedContent = /* @__PURE__ */ createElement(m.div, { ...opacityAnimation, key: "no-results" }, /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-60",
        image: /* @__PURE__ */ jsx(SvgImage, { src: notifySvg }),
        title: /* @__PURE__ */ jsx(Trans, { message: "This biolink does not have any content yet" })
      }
    ));
  } else if (isLoading) {
    renderedContent = /* @__PURE__ */ jsx(LoadingSkeleton, {});
  } else {
    renderedContent = /* @__PURE__ */ jsx(BiolinkItemList, { biolink });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    biolink && /* @__PURE__ */ jsx(
      NewWidgetDialogContainer,
      {
        biolink,
        activeWidget: activeWidgetDialog,
        onOpenChange: (isOpen) => {
          if (!isOpen) {
            setActiveWidgetDialog(null);
          }
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mb-20", children: [
      /* @__PURE__ */ jsx(AddNewLinkButton, {}),
      /* @__PURE__ */ jsxs(
        DialogTrigger,
        {
          type: "modal",
          onClose: (widgetType) => {
            if (widgetType) {
              setActiveWidgetDialog(widgetType);
            }
          },
          children: [
            /* @__PURE__ */ jsx(Button, { color: "primary", variant: "outline", startIcon: /* @__PURE__ */ jsx(WidgetsIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Add widget" }) }),
            /* @__PURE__ */ jsx(SelectWidgetDialog, {})
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: renderedContent })
  ] });
}
function BiolinkItemList({ biolink }) {
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: biolink == null ? void 0 : biolink.content.map((contentItem) => {
    const ContentItem = contentItem.model_type === "biolinkWidget" ? WidgetContentItem : LinkContentItem;
    return /* @__PURE__ */ jsx(
      ContentItem,
      {
        item: contentItem,
        biolink
      },
      `${contentItem.model_type}-${contentItem.id}`
    );
  }) }, "content");
}
function AddNewLinkButton() {
  const { biolink, biolinkId } = useEditorBiolink();
  const endpoint2 = `biolink/${biolinkId}/link`;
  const position2 = biolink == null ? void 0 : biolink.content.filter((x) => x.pinned).length;
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Button, { color: "primary", variant: "flat", className: "mr-14 min-w-144", children: /* @__PURE__ */ jsx(Trans, { message: "Add a link" }) }),
    /* @__PURE__ */ jsx(
      CreateLinkDialog,
      {
        endpoint: endpoint2,
        position: position2,
        group: biolink,
        hiddenFields: linkDialogHiddenFields,
        showButtonLabelField: true,
        invalidateQueries: false,
        onSuccess: (response) => {
          setEditorBiolink(response.biolink);
        }
      }
    )
  ] });
}
function LoadingSkeleton() {
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: [...Array(4).keys()].map((value, index) => /* @__PURE__ */ jsx(BiolinkSkeleton, {}, index)) }, "loading-skeleton");
}
function BiolinkSkeleton() {
  return /* @__PURE__ */ jsxs(
    BiolinkContentItemLayout,
    {
      title: /* @__PURE__ */ jsx(Skeleton, { className: "mb-14 text-sm max-w-192" }),
      actionRow: /* @__PURE__ */ jsx(Skeleton, { className: "text-xs max-w-288" }),
      children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "text-xs max-w-400" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "text-xs max-w-400" })
      ]
    }
  );
}
function ArticleEditorTitle() {
  const [editingTitle, setEditingTitle] = useState(false);
  const { trans } = useTrans();
  const form = useFormContext();
  const watchedTitle = form.watch("title");
  const titlePlaceholder = trans({ message: "Title" });
  if (editingTitle) {
    return /* @__PURE__ */ jsx(
      FormTextField,
      {
        placeholder: titlePlaceholder,
        autoFocus: true,
        className: "mb-30",
        onBlur: () => {
          setEditingTitle(false);
        },
        name: "title",
        required: true
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "h1",
    {
      tabIndex: 0,
      onClick: () => {
        setEditingTitle(true);
      },
      onFocus: () => {
        setEditingTitle(true);
      },
      className: clsx(
        "hover:bg-primary/focus rounded cursor-pointer",
        !watchedTitle && "text-muted"
      ),
      children: [
        watchedTitle || titlePlaceholder,
        /* @__PURE__ */ jsx(EditIcon, { className: "icon-sm mx-8 mt-8 align-top text-muted" })
      ]
    }
  );
}
const UndoIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" }),
  "UndoOutlined"
);
const RedoIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" }),
  "RedoOutlined"
);
function HistoryButtons({ editor }) {
  return /* @__PURE__ */ jsxs("span", { children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        disabled: !editor.can().undo(),
        onClick: () => {
          editor.commands.focus();
          editor.commands.undo();
        },
        children: /* @__PURE__ */ jsx(UndoIcon, {})
      }
    ),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        disabled: !editor.can().redo(),
        onClick: () => {
          editor.commands.focus();
          editor.commands.redo();
        },
        children: /* @__PURE__ */ jsx(RedoIcon, {})
      }
    )
  ] });
}
const CodeIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" }),
  "CodeOutlined"
);
function ModeButton({ editor }) {
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (newValue) => {
        if (newValue != null) {
          editor == null ? void 0 : editor.commands.setContent(newValue);
        }
      },
      children: [
        /* @__PURE__ */ jsx(Button, { variant: "text", startIcon: /* @__PURE__ */ jsx(CodeIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Source" }) }),
        /* @__PURE__ */ jsx(
          AceDialog,
          {
            title: /* @__PURE__ */ jsx(Trans, { message: "Source code" }),
            defaultValue: editor.getHTML()
          }
        )
      ]
    }
  );
}
function Divider() {
  return /* @__PURE__ */ jsx("div", { className: "self-stretch mx-4 w-1 bg-divider flex-shrink-0" });
}
const FormatBoldIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" }),
  "FormatBoldOutlined"
);
const FormatItalicIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" }),
  "FormatItalicOutlined"
);
const FormatUnderlinedIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" }),
  "FormatUnderlinedOutlined"
);
function FontStyleButtons({ editor, size: size2 }) {
  return /* @__PURE__ */ jsxs("span", { className: clsx("flex-shrink-0 whitespace-nowrap"), children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Bold" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size: size2,
        color: editor.isActive("bold") ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleBold();
        },
        children: /* @__PURE__ */ jsx(FormatBoldIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Italic" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size: size2,
        color: editor.isActive("italic") ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleItalic();
        },
        children: /* @__PURE__ */ jsx(FormatItalicIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Underline" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size: size2,
        color: editor.isActive("underline") ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleUnderline();
        },
        children: /* @__PURE__ */ jsx(FormatUnderlinedIcon, {})
      }
    ) })
  ] });
}
const FormatListBulletedIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" }),
  "FormatListBulletedOutlined"
);
const FormatListNumberedIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" }),
  "FormatListNumberedOutlined"
);
function ListButtons({ editor, size: size2 }) {
  const bulletActive = editor.isActive("bulletList");
  const orderedActive = editor.isActive("orderedList");
  return /* @__PURE__ */ jsxs("span", { className: clsx("flex-shrink-0", "whitespace-nowrap"), children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Bulleted list" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size: size2,
        color: bulletActive ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleBulletList();
        },
        children: /* @__PURE__ */ jsx(FormatListBulletedIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Numbered list" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size: size2,
        color: orderedActive ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleOrderedList();
        },
        children: /* @__PURE__ */ jsx(FormatListNumberedIcon, {})
      }
    ) })
  ] });
}
function insertLinkIntoTextEditor(editor, { text, target, href }) {
  if (editor.state.selection.empty && text) {
    editor.commands.insertContent(
      `<a href="${href}" target="${target}">${text}</a>`
    );
  } else if (!editor.state.selection.empty) {
    if (!href) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href, target }).run();
    }
  }
}
function LinkButton({ editor, size: size2 }) {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Insert link" }), children: /* @__PURE__ */ jsx(IconButton, { size: size2, className: clsx("flex-shrink-0"), children: /* @__PURE__ */ jsx(LinkIcon, {}) }) }),
    /* @__PURE__ */ jsx(LinkDialog, { editor })
  ] });
}
function LinkDialog({ editor }) {
  const previousUrl = editor.getAttributes("link").href;
  const previousText = editor.state.doc.textBetween(
    editor.state.selection.from,
    editor.state.selection.to,
    ""
  );
  const form = useForm({
    defaultValues: { href: previousUrl, text: previousText, target: "_blank" }
  });
  const { formId, close } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Insert link" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        id: formId,
        onSubmit: (value) => {
          insertLinkIntoTextEditor(editor, value);
          close();
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "href",
              label: /* @__PURE__ */ jsx(Trans, { message: "URL" }),
              autoFocus: true,
              type: "url",
              className: "mb-20"
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "text",
              label: /* @__PURE__ */ jsx(Trans, { message: "Text to display" }),
              className: "mb-20"
            }
          ),
          /* @__PURE__ */ jsxs(
            FormSelect,
            {
              selectionMode: "single",
              name: "target",
              label: /* @__PURE__ */ jsx(Trans, { message: "Open link in..." }),
              children: [
                /* @__PURE__ */ jsx(Item, { value: "_self", children: /* @__PURE__ */ jsx(Trans, { message: "Current window" }) }),
                /* @__PURE__ */ jsx(Item, { value: "_blank", children: /* @__PURE__ */ jsx(Trans, { message: "New window" }) })
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: close, variant: "text", children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(Button, { type: "submit", form: formId, variant: "flat", color: "primary", children: /* @__PURE__ */ jsx(Trans, { message: "Save" }) })
    ] })
  ] });
}
const TwoMB = 2097152;
function ImageButton({ editor, size: size2, diskPrefix = "page_media" }) {
  const { selectAndUploadFile } = useActiveUpload();
  const handleUpload = () => {
    selectAndUploadFile({
      showToastOnRestrictionFail: true,
      restrictions: {
        allowedFileTypes: [UploadInputType.image],
        maxFileSize: TwoMB
      },
      metadata: {
        diskPrefix,
        disk: Disk.public
      },
      onSuccess: (entry) => {
        editor.commands.focus();
        editor.commands.setImage({
          src: entry.url
        });
      }
    });
  };
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Insert image" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      size: size2,
      onClick: handleUpload,
      className: clsx("flex-shrink-0"),
      children: /* @__PURE__ */ jsx(ImageIcon, {})
    }
  ) });
}
const FormatClearIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20 8V5H6.39l3 3h1.83l-.55 1.28 2.09 2.1L14.21 8zM3.41 4.86 2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21l1.41-1.41z" }),
  "FormatClearOutlined"
);
function ClearFormatButton({ editor, size: size2 }) {
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Clear formatting" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      className: clsx("flex-shrink-0"),
      size: size2,
      onClick: () => {
        editor.chain().focus().clearNodes().unsetAllMarks().run();
      },
      children: /* @__PURE__ */ jsx(FormatClearIcon, {})
    }
  ) });
}
const HorizontalRuleIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4 11h16v2H4z" }),
  "HorizontalRuleOutlined"
);
const PriorityHighIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("circle", { cx: "12", cy: "19", r: "2" }, "0"), /* @__PURE__ */ jsx("path", { d: "M10 3h4v12h-4z" }, "1")],
  "PriorityHighOutlined"
);
const NoteIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16 4H4c-1.1 0-2 .9-2 2v12.01c0 1.1.9 1.99 2 1.99h16c1.1 0 2-.9 2-2v-8l-6-6zM4 18.01V6h11v5h5v7.01H4z" }),
  "NoteOutlined"
);
const SmartDisplayIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M9.5 7.5v9l7-4.5z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14.01H4V5.99h16v12.02z" }, "1")],
  "SmartDisplayOutlined"
);
function InsertMenuTrigger({ editor, size: size2 }) {
  const [dialog, setDialog] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs(
      MenuTrigger,
      {
        onItemSelected: (key) => {
          if (key === "hr") {
            editor.commands.focus();
            editor.commands.setHorizontalRule();
          } else if (key === "embed") {
            setDialog("embed");
          } else {
            editor.commands.focus();
            editor.commands.addInfo({ type: key });
          }
        },
        children: [
          /* @__PURE__ */ jsx(
            IconButton,
            {
              variant: "text",
              size: size2,
              className: clsx("flex-shrink-0"),
              children: /* @__PURE__ */ jsx(MoreVertIcon, {})
            }
          ),
          /* @__PURE__ */ jsxs(Menu, { children: [
            /* @__PURE__ */ jsx(Item, { value: "hr", startIcon: /* @__PURE__ */ jsx(HorizontalRuleIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Horizontal rule" }) }),
            /* @__PURE__ */ jsx(Item, { value: "embed", startIcon: /* @__PURE__ */ jsx(SmartDisplayIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Embed" }) }),
            /* @__PURE__ */ jsx(Item, { value: "important", startIcon: /* @__PURE__ */ jsx(PriorityHighIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Important" }) }),
            /* @__PURE__ */ jsx(Item, { value: "warning", startIcon: /* @__PURE__ */ jsx(WarningIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Warning" }) }),
            /* @__PURE__ */ jsx(Item, { value: "success", startIcon: /* @__PURE__ */ jsx(NoteIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Note" }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        type: "modal",
        isOpen: !!dialog,
        onClose: () => {
          setDialog(false);
        },
        children: /* @__PURE__ */ jsx(EmbedDialog, { editor })
      }
    )
  ] });
}
function EmbedDialog({ editor }) {
  const previousSrc = editor.getAttributes("embed").src;
  const form = useForm({
    defaultValues: { src: previousSrc }
  });
  const { formId, close } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Insert link" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        form,
        id: formId,
        onSubmit: (value) => {
          editor.commands.setEmbed(value);
          close();
        },
        children: /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "src",
            label: /* @__PURE__ */ jsx(Trans, { message: "Embed URL" }),
            autoFocus: true,
            type: "url",
            required: true
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: close, variant: "text", children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          form: formId,
          disabled: !form.formState.isValid,
          variant: "flat",
          color: "primary",
          children: /* @__PURE__ */ jsx(Trans, { message: "Add" })
        }
      )
    ] })
  ] });
}
function Keyboard({ children, modifier, separator = "+" }) {
  const modKey = isMac() ? /* @__PURE__ */ jsx("span", { className: "text-base align-middle", children: "⌘" }) : "Ctrl";
  return /* @__PURE__ */ jsxs("kbd", { className: "text-xs text-muted", children: [
    modifier && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      modKey,
      separator
    ] }),
    children
  ] });
}
function FormatMenuTrigger({ editor, size: size2 }) {
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      floatingMinWidth: "w-256",
      onItemSelected: (key) => {
        editor.commands.focus();
        if (typeof key === "string" && key.startsWith("h")) {
          editor.commands.toggleHeading({
            level: parseInt(key.replace("h", ""))
          });
        } else if (key === "code") {
          editor.commands.toggleCode();
        } else if (key === "strike") {
          editor.commands.toggleStrike();
        } else if (key === "super") {
          editor.commands.toggleSuperscript();
        } else if (key === "sub") {
          editor.commands.toggleSubscript();
        } else if (key === "blockquote") {
          editor.commands.toggleBlockquote();
        } else if (key === "paragraph") {
          editor.commands.setParagraph();
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            className: clsx("flex-shrink-0"),
            variant: "text",
            size: size2,
            endIcon: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
            children: /* @__PURE__ */ jsx(Trans, { message: "Format" })
          }
        ),
        /* @__PURE__ */ jsxs(Menu, { children: [
          /* @__PURE__ */ jsx(Item, { value: "h1", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+1" }), children: /* @__PURE__ */ jsx(Trans, { message: "Heading :number", values: { number: 1 } }) }),
          /* @__PURE__ */ jsx(Item, { value: "h2", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+2" }), children: /* @__PURE__ */ jsx(Trans, { message: "Heading :number", values: { number: 2 } }) }),
          /* @__PURE__ */ jsx(Item, { value: "h3", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+3" }), children: /* @__PURE__ */ jsx(Trans, { message: "Heading :number", values: { number: 3 } }) }),
          /* @__PURE__ */ jsx(Item, { value: "h4", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+4" }), children: /* @__PURE__ */ jsx(Trans, { message: "Heading :number", values: { number: 4 } }) }),
          /* @__PURE__ */ jsx(Item, { value: "code", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "E" }), children: /* @__PURE__ */ jsx(Trans, { message: "Code" }) }),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "strike",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Shift+X" }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Strikethrough" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "super",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, separator: " ", children: "." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Superscript" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "sub",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, separator: " ", children: "," }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Subscript" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "blockquote",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Shift+B" }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Blockquote" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "paragraph",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+0" }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Paragraph" })
            }
          )
        ] })
      ]
    }
  );
}
const FormatColorTextIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M2 20h20v4H2v-4zm3.49-3h2.42l1.27-3.58h5.65L16.09 17h2.42L13.25 3h-2.5L5.49 17zm4.42-5.61 2.03-5.79h.12l2.03 5.79H9.91z" }),
  "FormatColorTextOutlined"
);
function ColorButtons({ editor, size: size2 }) {
  const [dialog, setDialog] = useState(false);
  const textActive = editor.getAttributes("textStyle").color;
  const backgroundActive = editor.getAttributes("textStyle").backgroundColor;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("span", { className: clsx("flex-shrink-0 whitespace-nowrap"), children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          size: size2,
          color: textActive ? "primary" : null,
          onClick: () => {
            setDialog("text");
          },
          children: /* @__PURE__ */ jsx(FormatColorTextIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        IconButton,
        {
          size: size2,
          color: backgroundActive ? "primary" : null,
          onClick: () => {
            setDialog("bg");
          },
          children: /* @__PURE__ */ jsx(FormatColorFillIcon, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        defaultValue: dialog === "text" ? "#000000" : "#FFFFFF",
        type: "modal",
        isOpen: !!dialog,
        onClose: (newValue) => {
          if (newValue) {
            if (dialog === "text") {
              editor.commands.setColor(newValue);
            } else {
              editor.commands.setBackgroundColor(newValue);
            }
          }
          setDialog(false);
        },
        children: /* @__PURE__ */ jsx(ColorPickerDialog, {})
      }
    )
  ] });
}
const FormatAlignLeftIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z" }),
  "FormatAlignLeftOutlined"
);
const FormatAlignCenterIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z" }),
  "FormatAlignCenterOutlined"
);
const FormatAlignRightIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z" }),
  "FormatAlignRightOutlined"
);
const FormatAlignJustifyIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z" }),
  "FormatAlignJustifyOutlined"
);
const iconMap = {
  left: {
    icon: FormatAlignLeftIcon,
    label: message("Align left")
  },
  center: {
    icon: FormatAlignCenterIcon,
    label: message("Align center")
  },
  right: {
    icon: FormatAlignRightIcon,
    label: message("Align right")
  },
  justify: {
    icon: FormatAlignJustifyIcon,
    label: message("Justify")
  }
};
function AlignButtons({ editor, size: size2 }) {
  const activeKey = Object.keys(iconMap).find((key) => {
    return editor.isActive({ textAlign: key });
  }) || "left";
  const ActiveIcon = activeKey ? iconMap[activeKey].icon : iconMap.left.icon;
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      floatingWidth: "auto",
      selectionMode: "single",
      selectedValue: activeKey,
      onSelectionChange: (key) => {
        editor.commands.focus();
        editor.commands.setTextAlign(key);
      },
      children: [
        /* @__PURE__ */ jsx(
          IconButton,
          {
            size: size2,
            color: activeKey ? "primary" : null,
            className: clsx("flex-shrink-0"),
            children: /* @__PURE__ */ jsx(ActiveIcon, {})
          }
        ),
        /* @__PURE__ */ jsx(Menu, { children: Object.entries(iconMap).map(([name, config]) => {
          const Icon = config.icon;
          return /* @__PURE__ */ jsx(
            Item,
            {
              value: name,
              startIcon: /* @__PURE__ */ jsx(Icon, { size: "md" }),
              capitalizeFirst: true,
              children: /* @__PURE__ */ jsx(Trans, { message: config.label.message })
            },
            name
          );
        }) })
      ]
    }
  );
}
const FormatIndentDecreaseIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 17h10v-2H11v2zm-8-5 4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z" }),
  "FormatIndentDecreaseOutlined"
);
const FormatIndentIncreaseIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z" }),
  "FormatIndentIncreaseOutlined"
);
function IndentButtons({ editor, size: size2 }) {
  return /* @__PURE__ */ jsxs("span", { className: clsx("flex-shrink-0", "whitespace-nowrap"), children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Decrease indent" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size: size2,
        onClick: () => {
          editor.commands.focus();
          editor.commands.outdent();
        },
        children: /* @__PURE__ */ jsx(FormatIndentDecreaseIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Increase indent" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size: size2,
        onClick: () => {
          editor.commands.focus();
          editor.commands.indent();
        },
        children: /* @__PURE__ */ jsx(FormatIndentIncreaseIcon, {})
      }
    ) })
  ] });
}
function CodeBlockMenuTrigger({ editor, size: size2 }) {
  const language = editor.getAttributes("codeBlock").language || "";
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      selectionMode: "single",
      selectedValue: language,
      onSelectionChange: (key) => {
        editor.commands.toggleCodeBlock({ language: key });
      },
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Codeblock" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            className: clsx("flex-shrink-0"),
            size: size2,
            color: language ? "primary" : null,
            children: /* @__PURE__ */ jsx(CodeIcon, {})
          }
        ) }),
        /* @__PURE__ */ jsxs(Menu, { children: [
          /* @__PURE__ */ jsx(Item, { value: "html", children: "HTML" }),
          /* @__PURE__ */ jsx(Item, { value: "javascript", children: "JavaScript" }),
          /* @__PURE__ */ jsx(Item, { value: "css", children: "CSS" }),
          /* @__PURE__ */ jsx(Item, { value: "php", children: "PHP" }),
          /* @__PURE__ */ jsx(Item, { value: "shell", children: "Shell" }),
          /* @__PURE__ */ jsx(Item, { value: "bash", children: "Bash" }),
          /* @__PURE__ */ jsx(Item, { value: "ruby", children: "Ruby" }),
          /* @__PURE__ */ jsx(Item, { value: "python", children: "Python" }),
          /* @__PURE__ */ jsx(Item, { value: "java", children: "Java" }),
          /* @__PURE__ */ jsx(Item, { value: "c++", children: "C++" })
        ] })
      ]
    }
  );
}
const MenubarRowClassName = "flex items-center px-4 h-42 text-muted border-b overflow-hidden";
function ArticleBodyEditorMenubar({
  editor,
  size: size2 = "md",
  justify = "justify-center",
  hideInsertButton = false,
  imageDiskPrefix
}) {
  const isMobile = useIsMobileMediaQuery();
  const [extendedVisible, setExtendedVisible] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: clsx(extendedVisible ? "h-84" : "h-42"), children: [
    /* @__PURE__ */ jsxs("div", { className: clsx(MenubarRowClassName, justify, "relative z-20"), children: [
      /* @__PURE__ */ jsx(FormatMenuTrigger, { editor, size: size2 }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(FontStyleButtons, { editor, size: size2 }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(AlignButtons, { editor, size: size2 }),
      /* @__PURE__ */ jsx(IndentButtons, { editor, size: size2 }),
      /* @__PURE__ */ jsx(Divider, {}),
      isMobile ? /* @__PURE__ */ jsx(
        IconButton,
        {
          className: "flex-shrink-0",
          color: extendedVisible ? "primary" : null,
          size: size2,
          onClick: () => {
            setExtendedVisible(!extendedVisible);
          },
          children: extendedVisible ? /* @__PURE__ */ jsx(UnfoldLessIcon, {}) : /* @__PURE__ */ jsx(UnfoldMoreIcon, {})
        }
      ) : /* @__PURE__ */ jsx(
        ExtendedButtons,
        {
          editor,
          size: size2,
          hideInsertButton,
          imageDiskPrefix
        }
      )
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: extendedVisible && /* @__PURE__ */ jsx(
      m.div,
      {
        className: clsx(
          MenubarRowClassName,
          justify,
          "absolute flex h-full w-full"
        ),
        initial: { y: "-100%" },
        animate: { y: 0 },
        exit: { y: "-100%" },
        children: /* @__PURE__ */ jsx(
          ExtendedButtons,
          {
            editor,
            size: size2,
            imageDiskPrefix
          }
        )
      }
    ) })
  ] });
}
function ExtendedButtons({
  editor,
  size: size2 = "md",
  hideInsertButton,
  imageDiskPrefix
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ListButtons, { editor, size: size2 }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(LinkButton, { editor, size: size2 }),
    /* @__PURE__ */ jsx(ImageButton, { editor, size: size2, diskPrefix: imageDiskPrefix }),
    !hideInsertButton && /* @__PURE__ */ jsx(InsertMenuTrigger, { editor, size: size2 }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(ColorButtons, { editor, size: size2 }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(CodeBlockMenuTrigger, { editor, size: size2 }),
    /* @__PURE__ */ jsx(ClearFormatButton, { editor, size: size2 })
  ] });
}
function ArticleEditorStickyHeader({
  editor,
  allowSlugEditing = true,
  onSave,
  saveButton,
  isLoading = false,
  backLink,
  slugPrefix = "pages",
  imageDiskPrefix
}) {
  const { isSticky, sentinelRef } = useStickySentinel();
  const isMobile = useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { ref: sentinelRef }),
    /* @__PURE__ */ jsxs("div", { className: clsx("sticky top-0 z-10 mb-20 bg", isSticky && "shadow"), children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-20 border-b px-20 py-10 text-muted sm:justify-start", children: [
        !isMobile && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "text",
              size: "sm",
              elementType: Link,
              to: backLink,
              relative: "path",
              startIcon: /* @__PURE__ */ jsx(ArrowBackIcon, {}),
              children: /* @__PURE__ */ jsx(Trans, { message: "Back" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mr-auto", children: allowSlugEditing && /* @__PURE__ */ jsx(
            FormSlugEditor,
            {
              name: "slug",
              showLinkIcon: false,
              prefix: slugPrefix
            }
          ) })
        ] }),
        editor && /* @__PURE__ */ jsx(HistoryButtons, { editor }),
        !isMobile && /* @__PURE__ */ jsx(ModeButton, { editor }),
        onSave && /* @__PURE__ */ jsx(
          SaveButton,
          {
            onSave: () => {
              onSave(editor.getHTML());
            },
            isLoading
          }
        ),
        saveButton
      ] }),
      /* @__PURE__ */ jsx(
        ArticleBodyEditorMenubar,
        {
          editor,
          size: "sm",
          imageDiskPrefix
        }
      )
    ] })
  ] });
}
function SaveButton({ onSave, isLoading }) {
  const form = useFormContext();
  const title = form.watch("title");
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "flat",
      size: "sm",
      color: "primary",
      className: "min-w-90",
      disabled: isLoading || !title,
      onClick: () => onSave(),
      children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
    }
  );
}
function FormSlugEditor({ name, ...other }) {
  const {
    field: { onChange, onBlur, value = "", ref }
  } = useController({
    name
  });
  const manuallyChanged = useRef(false);
  const { watch, setValue } = useFormContext();
  useEffect(() => {
    const subscription = watch((formVal, { name: fieldName }) => {
      if (fieldName === "title" && !manuallyChanged.current) {
        setValue("slug", formVal.title);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);
  return /* @__PURE__ */ jsx(
    SlugEditor,
    {
      className: clsx(!value && "invisible"),
      onChange: (e) => {
        manuallyChanged.current = true;
        onChange(e);
      },
      onInputBlur: onBlur,
      value,
      inputRef: ref,
      ...other
    }
  );
}
function useCreateLinkPage() {
  return useMutation({
    mutationFn: (payload) => createPage(payload),
    onError: (err) => showHttpErrorToast(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["link-page"] });
      toast(message("Page created"));
    }
  });
}
function createPage(payload) {
  return apiClient.post("link-page", payload).then((r) => r.data);
}
const ArticleBodyEditor$1 = React.lazy(
  () => import("./article-body-editor-0f3fd55b.mjs")
);
function CreateLinkPage() {
  const navigate = useNavigate$1();
  const createPage2 = useCreateLinkPage();
  const form = useForm();
  const handleSave = (editorContent) => {
    createPage2.mutate(
      {
        ...form.getValues(),
        body: editorContent
      },
      {
        onSuccess: () => navigate("../", { relative: "path" })
      }
    );
  };
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, {}), children: /* @__PURE__ */ jsx(ArticleBodyEditor$1, { children: (content, editor) => /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsxs(FormProvider, { ...form, children: [
    /* @__PURE__ */ jsx(
      ArticleEditorStickyHeader,
      {
        editor,
        isLoading: createPage2.isPending,
        onSave: handleSave,
        backLink: "../",
        allowSlugEditing: false
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mx-20", children: /* @__PURE__ */ jsxs("div", { className: "prose dark:prose-invert mx-auto flex-auto", children: [
      /* @__PURE__ */ jsx(ArticleEditorTitle, {}),
      content
    ] }) })
  ] }) }) }) });
}
function useLinkPage(pageId) {
  const params2 = useParams();
  if (!pageId) {
    pageId = params2.pageId;
  }
  return useQuery({
    queryKey: ["link-page", `${pageId}`],
    queryFn: () => fetchLinkPage(pageId)
  });
}
function fetchLinkPage(slugOrId) {
  return apiClient.get(`link-page/${slugOrId}`).then((response) => response.data);
}
function useUpdateLinkPage() {
  const { pageId } = useParams();
  return useMutation({
    mutationFn: (payload) => updatePage(pageId, payload),
    onError: (err) => showHttpErrorToast(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("link-page")
      });
      toast(message("Page updated"));
    }
  });
}
function updatePage(pageId, payload) {
  return apiClient.put(`link-page/${pageId}`, payload).then((r) => r.data);
}
const ArticleBodyEditor = React.lazy(
  () => import("./article-body-editor-0f3fd55b.mjs")
);
function EditLinkPage() {
  const query = useLinkPage();
  return query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(PageContent, { page: query.data.page })
  ] }) : /* @__PURE__ */ jsx("div", { className: "relative w-full h-full", children: /* @__PURE__ */ jsx(PageStatus, { query }) });
}
function PageContent({ page }) {
  const navigate = useNavigate$1();
  const updatePage2 = useUpdateLinkPage();
  const form = useForm({
    defaultValues: {
      title: page.title,
      slug: page.slug,
      body: page.body
    }
  });
  const handleSave = (editorContent) => {
    updatePage2.mutate(
      {
        ...form.getValues(),
        body: editorContent
      },
      {
        onSuccess: () => navigate("../..", { relative: "path" })
      }
    );
  };
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, {}), children: /* @__PURE__ */ jsx(ArticleBodyEditor, { initialContent: page.body, children: (content, editor) => /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsxs(FormProvider, { ...form, children: [
    /* @__PURE__ */ jsx(
      ArticleEditorStickyHeader,
      {
        editor,
        backLink: "../..",
        isLoading: updatePage2.isPending,
        onSave: handleSave,
        allowSlugEditing: false
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mx-20", children: /* @__PURE__ */ jsxs("div", { className: "prose dark:prose-invert mx-auto flex-auto", children: [
      /* @__PURE__ */ jsx(ArticleEditorTitle, {}),
      content
    ] }) })
  ] }) }) }) });
}
const SharedDashboardRoutes = ({ forCurrentUser = false }) => {
  return [
    // links
    {
      path: "links",
      element: /* @__PURE__ */ jsx(LinksDatablePage, { forCurrentUser })
    },
    {
      path: "links/:linkId",
      element: /* @__PURE__ */ jsx(LinkClicksReportPage, {})
    },
    // biolinks
    {
      path: "biolinks",
      element: /* @__PURE__ */ jsx(BioLinksDatatablePage, { forCurrentUser })
    },
    {
      path: "biolinks/:biolinkId",
      element: /* @__PURE__ */ jsx(BiolinkClicksReportPage, {})
    },
    {
      path: "biolinks/:biolinkId/edit",
      element: /* @__PURE__ */ jsx(Navigate, { to: "content", replace: true })
    },
    {
      path: "biolinks/:biolinkId/edit/:tabName",
      element: /* @__PURE__ */ jsx(BiolinkEditorPage, {})
    },
    // groups
    {
      path: "link-groups",
      element: /* @__PURE__ */ jsx(LinkGroupsDatatablePage, { forCurrentUser })
    },
    {
      path: "link-groups/:groupId",
      element: /* @__PURE__ */ jsx(LinkGroupClicksReportPage, {})
    },
    {
      path: "link-groups/:groupId/links",
      element: /* @__PURE__ */ jsx(LinkGroupsLinksDatatablePage, {})
    },
    {
      path: "link-groups/:groupId/links/:linkId",
      element: /* @__PURE__ */ jsx(LinkClicksReportPage, {})
    },
    // domains
    {
      path: "custom-domains",
      element: /* @__PURE__ */ jsx(DomainsDatatablePage, { forCurrentUser })
    },
    // tracking pixels
    {
      path: "pixels",
      element: /* @__PURE__ */ jsx(TrackingPixelsDatablePage, { forCurrentUser })
    },
    // overlays
    {
      path: "link-overlays",
      element: /* @__PURE__ */ jsx(LinkOverlaysDatatablePage, { forCurrentUser })
    },
    {
      path: "link-overlays/new",
      element: /* @__PURE__ */ jsx(CreateLinkOverlayPage, {})
    },
    {
      path: "link-overlays/:overlayId/edit",
      element: /* @__PURE__ */ jsx(UpdateLinkOverlayPage, {})
    }
  ];
};
function DashboardRoutes() {
  const { workspaceId } = useActiveWorkspaceId();
  const DashboardRouteConfig = [
    {
      path: "/",
      element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(BelinkDashboardLayout, {}) }),
      children: [
        { index: true, element: /* @__PURE__ */ jsx(AllClicksReportPage, {}) },
        // link pages
        {
          path: "link-pages",
          element: /* @__PURE__ */ jsx(LinkPagesDatatablePage, { forCurrentUser: !workspaceId })
        },
        {
          path: "link-pages/new",
          element: /* @__PURE__ */ jsx(CreateLinkPage, {})
        },
        {
          path: "link-pages/:pageId/edit",
          element: /* @__PURE__ */ jsx(EditLinkPage, {})
        },
        ...SharedDashboardRoutes({ forCurrentUser: !workspaceId })
      ]
    },
    { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) }
  ];
  return useRoutes(DashboardRouteConfig);
}
const dashboardRoutes = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SharedDashboardRoutes,
  default: DashboardRoutes
}, Symbol.toStringTag, { value: "Module" }));
export {
  timestampFilter as $,
  Accordion as A,
  themeValueToHex as B,
  ChipList as C,
  DashboardLayout as D,
  Tabs as E,
  FilterOperator as F,
  TabList as G,
  Tab as H,
  TabPanels as I,
  TabPanel as J,
  KeyboardArrowRightIcon as K,
  ChipField as L,
  MoreVertIcon as M,
  NameWithAvatar as N,
  useCurrentDateTime as O,
  useStickySentinel as P,
  DatatableDataQueryKey as Q,
  downloadFileFromUrl as R,
  Switch as S,
  TuneIcon as T,
  useNormalizedModels as U,
  Avatar as V,
  DataTable as W,
  useDataTable as X,
  slugifyString as Y,
  FileDownloadIcon as Z,
  USER_MODEL as _,
  DashboardNavbar as a,
  FormNormalizedModelField as a0,
  LineChart as a1,
  PolarAreaChart as a2,
  BarChart as a3,
  GeoChart as a4,
  DateRangePresets as a5,
  ReportDateSelector as a6,
  ClicksReportCharts as a7,
  SharedDashboardRoutes as a8,
  ArticleEditorStickyHeader as a9,
  FormatItalicIcon as aA,
  FormatListBulletedIcon as aB,
  FormatListNumberedIcon as aC,
  FormatUnderlinedIcon as aD,
  GradientIcon as aE,
  GroupIcon as aF,
  HelpOutlineIcon as aG,
  HorizontalRuleIcon as aH,
  ListAltIcon as aI,
  MenuOpenIcon as aJ,
  MoreTimeIcon as aK,
  MoveDownIcon as aL,
  NoteIcon as aM,
  PersonAddIcon as aN,
  PriorityHighIcon as aO,
  PublicIcon as aP,
  RedoIcon as aQ,
  ShortcutIcon as aR,
  SmartDisplayIcon as aS,
  SwapVertIcon as aT,
  UndoIcon as aU,
  UploadIcon as aV,
  WidgetsIcon as aW,
  useFilter as aX,
  dashboardRoutes as aY,
  ArticleEditorTitle as aa,
  FontSelector$1 as ab,
  BooleanIndicator as ac,
  InfoIcon as ad,
  AccountTreeIcon as ae,
  AddLinkIcon as af,
  AnimationIcon as ag,
  ArrowBackIcon as ah,
  ArrowDownwardIcon as ai,
  ArrowForwardIcon as aj,
  ArrowRightAltIcon as ak,
  ArrowUpwardIcon as al,
  BarChartIcon as am,
  CodeIcon as an,
  DateRangeIcon as ao,
  FilterAltIcon as ap,
  FormatAlignCenterIcon as aq,
  FormatAlignJustifyIcon as ar,
  FormatAlignLeftIcon as as,
  FormatAlignRightIcon as at,
  FormatBoldIcon as au,
  FormatClearIcon as av,
  FormatColorFillIcon as aw,
  FormatColorTextIcon as ax,
  FormatIndentDecreaseIcon as ay,
  FormatIndentIncreaseIcon as az,
  DashboardSidenav as b,
  DashboardContent as c,
  FilterControlType as d,
  createdAtFilter as e,
  FormDatePicker as f,
  FormSwitch as g,
  DataTablePage as h,
  DeleteSelectedItemsAction as i,
  DataTableEmptyStateMessage as j,
  DataTableExportCsvButton as k,
  DataTableAddItemButton as l,
  chunkArray as m,
  AccordionItem as n,
  AddIcon as o,
  FormChipField as p,
  usePointerEvents as q,
  ColorIcon as r,
  ColorPickerDialog as s,
  DeleteIcon as t,
  updatedAtFilter as u,
  useSortable as v,
  DragIndicatorIcon as w,
  AceDialog as x,
  CustomPageDatatableFilters as y,
  articlesSvg as z
};
//# sourceMappingURL=dashboard-routes-2fef812b.mjs.map
