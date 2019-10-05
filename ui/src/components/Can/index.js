import { rules } from "../../utils/authorization";

export const isAllowed = (role, action) => {
  const permissions = rules[role];
  if (!permissions) {
    return false;
  }

  const staticPermissions = permissions.static;

  if (staticPermissions && staticPermissions.includes(action)) {
    return true;
  }

  return false;
};

const Can = (props) => {
    if (isAllowed(props.role, props.perform)) {
        return props.children;
    } else if (props.declined) {
        props.declined()
    }

    return null;
}
  


export default Can;