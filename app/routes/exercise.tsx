import { Outlet } from "@remix-run/react";

export default function Exercise() {
    return (
        <div>
            <h1> Exercise Page</h1>
            <Outlet />
        </div>
    );
}
