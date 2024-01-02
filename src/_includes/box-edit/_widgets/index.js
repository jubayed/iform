import { CheckboxWidget } from "./_checkbox/checkbox";
import { RadioWidget } from "./_checkbox/radio";

import { ColorWidget } from "./_input/color";
import { DateWidget } from "./_input/date";
import { EmailWidget } from "./_input/email";
import { FileWidget } from "./_input/file";
import { NumberWidget } from "./_input/number";
import { PasswordWidget } from "./_input/password";
import { RangeWidget } from "./_input/range";
import { SearchWidget } from "./_input/search";
import { TelWidget } from "./_input/tel";
import { TextWidget } from "./_input/text";
import { TimeWidget } from "./_input/time";
import { UrlWidget } from "./_input/url";

import { HeadingWidget } from "./_paragraph/h";
import { ParagraphWidget } from "./_paragraph/p";

import { BrWidget } from "./_hr/br";
import { HrWidget } from "./_hr/hr";
import { HiddenWidget } from "./_hr/hidden";
//single widget
import { SelectWidget } from "./_select";
import { TextAreaWidget } from "./_textarea";
import { ButtonWidget } from "./_button";

const Widgets = {
    Br: BrWidget,
    Hr: HrWidget,
    Text: TextWidget,
    Number: NumberWidget,
    Date: DateWidget,
    Time: TimeWidget,
    Email: EmailWidget,
    Password: PasswordWidget,
    Checkbox: CheckboxWidget,
    Radio: RadioWidget,
    File: FileWidget,
    Color: ColorWidget,
    Range: RangeWidget,
    Url: UrlWidget,
    Tel: TelWidget,
    Search: SearchWidget,
    Hidden: HiddenWidget,
    Select: SelectWidget,
    TextArea: TextAreaWidget,
    Button: ButtonWidget,
    Heading: HeadingWidget,
    Paragraph: ParagraphWidget,
}

export default Widgets;