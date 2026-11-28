import './ExplorerTabs.css';

export type ExplorerMode = 'scales' | 'chords' | 'arpeggios';

interface ExplorerTabsProps {
    activeMode: ExplorerMode;
    onModeChange: (mode: ExplorerMode) => void;
}

const tabs: { label: string; value: ExplorerMode }[] = [
    { label: 'Scales', value: 'scales' },
    { label: 'Chords', value: 'chords' },
    { label: 'Arpeggios', value: 'arpeggios' }
];

function ExplorerTabs({
    activeMode,
    onModeChange
}: ExplorerTabsProps) {
    return (
        <nav
            className="explorer-tabs"
            aria-label="Explorer modes"
        >
            {tabs.map(tab => (
                <button
                    key={tab.value}
                    type="button"
                    className={`explorer-tab ${
                        activeMode === tab.value ? 'active' : ''
                    }`}
                    aria-pressed={activeMode === tab.value}
                    onClick={() => onModeChange(tab.value)}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
}

export default ExplorerTabs;