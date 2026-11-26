// src/Effects.tsx
import React, { useState, useEffect } from 'react';
import { subscribe, unsubscribe } from './resources/API';

interface EffectsProps {
    sourceId: string;
}

export const Effects: React.FC<EffectsProps> = ({ sourceId }) => {
    // Последнее сообщение. При смене источника сбрасываем в -1
    const [lastMessage, setLastMessage] = useState<number | string>(-1);

    useEffect(() => {
        // При смене sourceId считаем, что сообщений ещё не было
        setLastMessage(-1);

        // Важно: callback должен быть одной и той же функцией
        // и для subscribe, и для unsubscribe
        const callback = (message: number | string) => {
            setLastMessage(message);
        };

        subscribe(sourceId, callback);

        // Cleanup — обязательно отписываемся
        return () => {
            unsubscribe(sourceId, callback);
        };
    }, [sourceId]);

    // Формат вывода: <Название>: <последнее_сообщение>
    // В большинстве шаблонов этого задания название источника = sourceId
    return (
        <div>
            {sourceId}: {lastMessage}
        </div>
    );
};

export default Effects;
