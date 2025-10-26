"use client";

import { useState, useEffect } from "react";
import { FormattedAttributeGroup, FormattedCombination } from "@/lib/types";

interface AttributeSelectorProps {
  groups: FormattedAttributeGroup[];
  combinations: FormattedCombination[];
  onSelectionChange: (combination: FormattedCombination | null) => void;
}

export default function AttributeSelector({
  groups,
  combinations,
  onSelectionChange,
}: AttributeSelectorProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: number]: number;
  }>({});

  // Trouver la combinaison correspondant aux attributs sélectionnés
  useEffect(() => {
    if (Object.keys(selectedAttributes).length !== groups.length) {
      onSelectionChange(null);
      return;
    }

    const selectedAttributeIds = Object.values(selectedAttributes);
    const matchingCombination = combinations.find((combination) => {
      const combinationAttrs = combination.attributes;
      return selectedAttributeIds.every((id) => combinationAttrs.includes(id));
    });

    onSelectionChange(matchingCombination || null);
  }, [selectedAttributes, groups, combinations, onSelectionChange]);

  const handleAttributeSelect = (groupId: number, attributeId: number) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [groupId]: attributeId,
    }));
  };

  return (
    <div className="space-y-4 border-t border-gray-200 pt-4">
      <h3 className="text-lg font-medium text-gray-900">Options disponibles</h3>

      {groups.map((group) => (
        <div key={group.id} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {group.name}:
          </label>

          {group.id === 2 ? (
            // Couleurs - affichage visuel
            <div className="flex flex-wrap gap-2">
              {group.values.map((value) => (
                <button
                  key={value.id}
                  type="button"
                  title={value.name}
                  onClick={() => handleAttributeSelect(group.id, value.id)}
                  className={`w-8 h-8 rounded-full border transition-all ${
                    selectedAttributes[group.id] === value.id
                      ? "border-2 border-blue-500 ring-2 ring-blue-300"
                      : "border-gray-300 hover:border-blue-500"
                  }`}
                  style={{ backgroundColor: value.color || "#eee" }}
                >
                  {!value.color && value.name.substring(0, 1)}
                </button>
              ))}
            </div>
          ) : (
            // Autres attributs - liste déroulante
            <select
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) =>
                handleAttributeSelect(group.id, parseInt(e.target.value))
              }
              value={selectedAttributes[group.id] || ""}
            >
              <option value="">Sélectionnez {group.name.toLowerCase()}</option>
              {group.values.map((value) => (
                <option key={value.id} value={value.id}>
                  {value.name}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
}
