import { UserWidget } from "./UserWidget.js";

export function MembersPanel ({users, name}) {

    return (
        <>
        <div className="card bg-base-100 w-full shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{name} Members</h2>
                <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
                    {users.map((user => {
                        return(
                            <div className="carousel-item">
                                <UserWidget user={user}></UserWidget>
                            </div>
                        )
                    }))} 
                </div>
            </div>
        </div>  
        </>
    )
}