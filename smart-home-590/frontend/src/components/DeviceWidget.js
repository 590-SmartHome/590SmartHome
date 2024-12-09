
export function DeviceWidget ({name, type, setting}) {

    

    return(
        <>
        <div className="card bg-primary text-primary-content w-fit h-fit">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{type}</p>
                <div className="card-actions justify-end">
                    <button className="btn">{setting}</button>
                </div>
            </div>
        </div>
        </>
    )
}