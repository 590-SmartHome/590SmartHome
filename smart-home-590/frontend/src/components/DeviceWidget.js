
export function DeviceWidget ({device}) {
    return(
        <>
        <div className="card bg-primary text-primary-content w-96">
            <div className="card-body">
                <h2 className="card-title">{device.name}</h2>
                <p>{device.type}</p>
                <div className="card-actions justify-end">
                    <button className="btn">{device.setting}</button>
                </div>
            </div>
        </div>
        </>
    )
}