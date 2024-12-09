import { UserWidget } from "./UserWidget.js";

export function MembersPanel ({users, name}) {

    return (
        <>
        <div className="card bg-base-100 w-3/4 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{name} Members</h2>
                <div className="flex">
                    {/* {users.map((user => {
                        return(
                            <UserWidget user={user}></UserWidget>
                        )
                    }))} */}
                </div>
            </div>
        </div>  
        </>
    )
}