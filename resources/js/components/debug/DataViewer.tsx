interface DataViewerProps {
    title: string;
    data: any;
}

export function DataViewer({ title, data }: DataViewerProps) {
    return (
        <div className="mb-4 rounded border border-gray-300 p-4">
            <h3 className="mb-2 text-lg font-bold">{title}</h3>
            <pre className="max-h-64 overflow-auto rounded bg-gray-100 p-2 text-xs">{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
