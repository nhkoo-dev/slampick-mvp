import { FilterPill } from '../../common/FilterPill';

export function FilterGroup({ options, selected, onSelect }) {
  return options.map((option) => (
    <FilterPill
      key={option}
      label={option}
      active={selected === option}
      onClick={() => onSelect(option)}
    />
  ));
}

// 3축(가용성/적합도/성과)은 다중 선택 가능. '전체'는 선택된 축이 없을 때의 상태를 의미한다.
export function AxisFilterGroup({ options, selectedAxes, onToggle }) {
  return options.map((option) => {
    let active;

    if (option === '전체') {
      active = selectedAxes.size === 0;
    } else {
      active = selectedAxes.has(option);
    }

    return (
      <FilterPill
        key={option}
        label={option}
        active={active}
        onClick={() => onToggle(option)}
      />
    );
  });
}
